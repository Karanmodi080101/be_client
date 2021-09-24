import axios from 'axios';
// const rre = import "../../../assets/json/development-goals.json";

export default class DevelopmentGoalService {
  getProductsSmall() {
    return axios
      .get('/assets/json/development-goals.json')
      .then((res) => res.data.data);
  }
}
export const goalListGeneration = (strengthsWF, AOI, teamTechStack) => {
  let goalList = [];

  goalList = extend(goalList, strengthsWF);
  goalList = extend(goalList, AOI);
  return goalList;
};
export const intersect = (listA, listB) => {
  return listA.filter((value) => listB.includes(value));
};

export const extend = (listA, listB) => {
  if (listB.size !== 0) {
    listA.push.apply(listA, listB);
  }
  return listA;
};
