const axios = require("axios");

class ApiService {
  constructor() {
    this.api = {
      method: "GET",
      url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
      headers: {
        "X-RapidAPI-Key": "4f127d7e80msh033583c7d24821dp1ee847jsn21e209ffa220",
        "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
      },
    };
  }

  getExercisePerMuscle = (muscleName) => {
    this.api.params = { muscle: muscleName };
    return axios.request(this.api);
  };

  getExercisePerName = (exerciseName) => {
    this.api.params = { name: exerciseName };
    return axios.request(this.api);
  };

  getExercisePerType = (exerciseType) => {
    this.api.params = { name: exerciseType };
    return axios.request(this.api);
  };
}

module.exports = ApiService;
