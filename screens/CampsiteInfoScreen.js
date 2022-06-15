import RenderCampsite from "../features/campsites/RenderCampsite";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params; // where all params for this route are located
  return <RenderCampsite campsite={campsite} />;
};

export default CampsiteInfoScreen;
