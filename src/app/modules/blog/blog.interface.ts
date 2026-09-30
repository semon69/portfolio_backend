export type TBlog = {
  title: string;
  image: string;
  /** Post body as HTML, authored in the dashboard's rich-text editor. */
  description: string;
  /** Short summary shown on cards and in link previews. */
  excerpt?: string;
  tags?: string[];
  /** Drafts stay in the dashboard and are hidden on the public site. */
  published?: boolean;
};
