const initialState = {
  data: [
    {
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: require('../resources/videos/video-ad-1.mp4')
    },
    {
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: require('../resources/videos/video-ad-2.mp4')
    },
    {
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: require('../resources/videos/video-ad-3.mp4')
    },
    {
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: require('../resources/videos/video-ad-5.mp4')
    },
  ],
  dataMe: [
    {
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: require('../resources/videos/video-ad-6.mp4')
    },
    {
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: require('../resources/videos/video-ad-3.mp4')
    }
  ],
}

const createVideos = (state, action) => {
  let items = state.dataMe.slice(0);
  action.payload.forEach(v => {
    items.push({
      title: 'Game title',
      type: 'Football / Soccer',
      location: 'Casa del lector, Iron Hack',
      heart_rate: 'Avg Heart Rate 62BPM',
      steps: 'Steps per session 6,187',
      callories: 'Callories 208',
      video: {uri: v.videoPath}
    })
  });
  return items;
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_VIDEOS":
      return {
        ...state,
        dataMe: createVideos(Object.assign({}, state), action),
      }
    default:
      return state;
  }
};

export default reducer;
