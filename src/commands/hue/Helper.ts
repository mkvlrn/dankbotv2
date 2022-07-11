/* eslint-disable no-await-in-loop */

import {
  CommandInteraction,
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  SelectMenuInteraction,
} from 'discord.js';
import { autoInjectable, singleton } from 'tsyringe';

import { Axios } from '#utils/Axios';
import { Logger } from '#utils/Logger';
import { Post, RedditResponse, Reply } from './types';
import sublist from './subs.json';

@singleton()
@autoInjectable()
export class Helper {
  private subList = sublist;

  constructor(private axios?: Axios, private logger?: Logger) {}

  private getMedia(originalPost: Post) {
    const reply: Reply = {
      subreddit: originalPost.subreddit_name_prefixed,
      embed: new MessageEmbed()
        .setTitle(originalPost.title)
        .setURL(`https://reddit.com${originalPost.permalink}`),
    };

    let post = originalPost;

    if (originalPost.crosspost_parent_list) {
      post = originalPost.crosspost_parent_list[0] as Post;
    }

    if (post.post_hint === 'image') {
      reply.embed.setImage(post.url);
    } else if (post.post_hint === 'hosted:video') {
      reply.extra = post.media?.reddit_video?.fallback_url;
    } else if (post.post_hint === 'rich:video') {
      if (post.media?.type === 'youtube.com') {
        reply.extra = post.url;
      } else if (post.media?.type === 'gfycat.com') {
        reply.extra = post.preview?.reddit_video_preview.fallback_url;
      }
    }

    return reply;
  }

  private async getPost(subreddit: string) {
    const subs = this.subList.map((s) => s.name.toLowerCase());
    const sub: string =
      subreddit === 'Random'
        ? subs[Math.floor(Math.random() * subs.length)]
        : subs.filter((s) => s.toLowerCase() === subreddit)[0];

    const subUrl = `https://reddit.com/r/${sub}/random.json`;
    let post: Post | undefined;

    let timeout = 0;
    while (!post || !['image', 'hosted:video', 'rich:video'].includes(post.post_hint!)) {
      timeout += 1;
      if (timeout >= 5) {
        throw new Error('timeout');
      }
      const response = await this.axios!.get<RedditResponse>(subUrl);
      post = response.data[0].data.children[0].data;
    }

    try {
      return this.getMedia(post);
    } catch (error) {
      const err = error as Error;
      this.logger!.debug(JSON.stringify(post));
      throw err;
    }
  }

  public async commandInteract(interaction: CommandInteraction) {
    const sizePicker = new MessageSelectMenu()
      .setCustomId('hue-sub')
      .addOptions(
        [
          {
            label: 'Random',
            description: 'the planets shall align and bless you with great content',
            value: 'Random',
          },
        ].concat(
          this.subList
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((s) => ({
              label: s.name,
              description: s.description,
              value: s.name.toLowerCase(),
            })),
        ),
      )
      .setPlaceholder('Pick a sub');
    const row = new MessageActionRow().addComponents(sizePicker);
    await interaction.reply({
      components: [row],
      ephemeral: true,
    });
  }

  public async selectMenuInteract(interaction: SelectMenuInteraction) {
    const { channel, message, values } = interaction;
    const { user } = message!.interaction!;
    const sub = values[0];

    await interaction.update({
      content: '💩 *you can dismiss this message, you degenerate* 💩',
      components: [],
      embeds: [],
    });

    try {
      const reply = await this.getPost(sub);
      const subName =
        sub !== 'Random'
          ? this.subList.find((s) => s.name.toLowerCase() === sub)!.name
          : `Random (${reply.subreddit})`;
      reply.embed
        .setColor('BLURPLE')
        .setDescription(`${user} used **/hue**`)
        .addField('sub', subName);

      await channel?.send({
        embeds: [reply.embed],
      });
      if (reply.extra) {
        await channel?.send(reply.extra.replace(/\?.*/, ''));
      }
    } catch (err) {
      const error = err as unknown as Error;
      this.logger!.error(error.message);
    }
  }
}
