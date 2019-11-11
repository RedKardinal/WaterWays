import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchLocations() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.get('/api/locations/', config);
    console.log(response.data)
    yield put({type:'SET_LOCATIONS', payload: response.data});
    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session

  } catch (error) {
    console.log('Error with Get locations:', error);
  }
}

function* fetchSingleLocation(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log(action.payload);
    
    const response = yield axios.get(`/api/locations/${action.payload}`, config);

    yield put({ type: 'GET_SINGLE_LOCATION', payload: response.data });
    console.log(response.data);
  } catch (error) {
    console.log('single location get request failed', error);
  }
}

function* addLocation(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    const response = yield axios.post('/api/locations', action.payload);
    console.log(response);
    this.fetchLocations();
  } catch(error) {
    console.log('locations post request failed', error);
  }
}
function* deleteLocation(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('in delete saga',action.payload);
    yield axios.delete(`/api/locations/location/${action.payload}`, config);
    this.fetchLocations();
    // yield put({ type: 'GET_ANSWER'});
  } catch (error) {
    console.log('location delete request failed', error);
  }
}


function* locationsSaga() {
  yield takeLatest('FETCH_LOCATIONS', fetchLocations);
  yield takeLatest('POST_LOCATIONS', addLocation);
  yield takeLatest('DELETE_LOCATION', deleteLocation);
  yield takeLatest('FETCH_SINGLE_LOCATION', fetchSingleLocation);
}

export default locationsSaga;
