import axios from 'axios';
import {SUCCESS, FAIL} from './optmistic-update-types';

let TYPES = {
  'PROJECT_GET_ALL': 'PROJECT_GET_ALL',
  'PROJECT_GET_ALL_SUCCESS': 'PROJECT_GET_ALL' + SUCCESS,
  'PROJECT_GET_ALL_FAIL': 'PROJECT_GET_ALL' + FAIL,
  'PROJECT_SELECT': 'PROJECT_SELECT',
  'PROJECT_GET_ONE': 'PROJECT_GET_ONE',
  'PROJECT_GET_ONE_SUCCESS': 'PROJECT_GET_ONE'+ SUCCESS,
  'PROJECT_GET_ONE_FAIL': 'PROJECT_SAVE_ONE'+ FAIL,
  'PROJECT_SAVE': 'PROJECT_SAVE_ONE',
  'PROJECT_SAVE_SUCCESS': 'PROJECT_SAVE_ONE'+ SUCCESS,
  'PROJECT_SAVE_FAIL': 'PROJECT_SAVE_ONE'+ FAIL,
};


const actions = {
  'getAllProjects': () => {
    //using axios middleware with default client
    return {
      type: TYPES.PROJECT_GET_ALL,
      payload: {
        request: {
          url: '/api/project/all'
        }
      }
    }
  },
  'getProjectByCode': (code) => {
    return {
      type: TYPES.PROJECT_GET_ONE,
      payload: {
        promise: axios.get('/api/project/findByCode/'+code).then((r)=>{
          delete r.request;// se retornar um objeto request o middleware do axios tenta realizar a requisição
          return r;
        })
      }
    }
  },
  'setSelectedProject': (project) => {
      return {
        type: TYPES.PROJECT_SELECT,
        payload: project
      }
  },
  'saveProject': (project) => {
    //using axios middleware with default client
    return {
      type: TYPES.PROJECT_SAVE,
      payload: {
        request:{
          method: 'post',
          url: '/api/project/save',
          data: project
        }
      }
    }
  }
};

export {actions, TYPES};