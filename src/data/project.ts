export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "reviewOraclePage",
    techs: ["React", "UIKit"],
    link: "https://github.com/Melvin-King/reviewOraclePage",
  },
];

export default projects;
