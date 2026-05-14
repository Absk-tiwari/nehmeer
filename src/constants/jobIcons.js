import cook from "../assets/img/chef.svg";
import driver from "../assets/img/driver.svg";
import babysitter from "../assets/img/babyshitter.svg";
import dogSitter from "../assets/img/dog.svg";
import nurse from "../assets/img/nurse.svg";
import cleaner from "../assets/img/homeAide.svg";
import maid from "../assets/img/maid.svg";
import allRounder from "../assets/img/allrounder.svg";
import defaultIcon from "../assets/img/avatar.jpg";

const jobIcons = {
  1: cook,
  2: driver,
  3: babysitter,
  4: dogSitter,
  5: nurse,
  11: cleaner,
  12: maid,
  13: allRounder,
};

export const getJobIcon = (jobRoleId) => {
  return jobIcons[jobRoleId] || defaultIcon;
};

export default jobIcons;
