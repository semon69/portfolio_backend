export type TSkill = {
  name: string;
  /** Groups the skill on the public site, e.g. "Frontend". */
  category: string;
  /**
   * Legacy icon URL. The site renders skills as text chips now, so this
   * is no longer displayed — kept optional so existing records survive.
   */
  image?: string;
};
