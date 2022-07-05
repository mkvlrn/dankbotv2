import { MessageEmbed } from 'discord.js';

export type RedditResponse = {
  data: {
    children: { data: Post }[];
  };
}[];

export type Post = {
  subreddit_name_prefixed: string;
  title: string;
  permalink: string;
  post_hint?: string;
  over_18: boolean;
  spoiler: boolean;
  url: string;
  media?: {
    reddit_video?: {
      fallback_url: string;
    };
    type?: string;
  };
  preview?: {
    reddit_video_preview: {
      fallback_url: string;
    };
  };
  crosspost_parent_list?: any;
};

export type Reply = {
  subreddit: string;
  embed: MessageEmbed;
  extra?: string;
};
