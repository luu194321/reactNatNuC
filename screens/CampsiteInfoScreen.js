import { FlatList, StyleSheet, Text, View, Button, Modal } from "react-native";
import { Rating, Input, Icon } from "react-native-elements";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState(" ");
  const [text, setText] = useState(" ");
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);

  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const newComment = {
      author,
      rating,
      text,
      campsiteId: campsite.id,
    };
    // console.log(newComment);
    dispatch(postComment(newComment));
    setShowModal(!showModal);
    resetForm();
  };
  const resetForm = () => {
    setRating(5);
    setAuthor(" ");
    setText(" ");
  };
  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        {/* <Text style={{ fontSize: 14 }}>{item.text}</Text> */}
        <Rating
          startingValue={rating}
          readonly
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
        />
        <Text style={{ fontSize: 12 }}>{item.rating} Stars</Text>
        <Text style={{ fontSize: 12 }}>
          {`-- ${item.author}, ${item.date}`}
        </Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={comments.commentsArray.filter(
          (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          marginHorizontal: 20,
          paddingVertical: 20,
        }}
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorites.includes(campsite.id)}
              markFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
            <Text style={styles.commentsTitle}>Comments</Text>
          </>
        }
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={40}
            onFinishRating={(rating) => setRating(rating)}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Author"
            leftIcon={{ name: "user-o", type: "font-awesome" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(author) => setAuthor(author)}
            value={author}
          />
          <Input
            placeholder="Comment"
            leftIcon={{ name: "comment-o", type: "font-awesome" }}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={(comment) => setText(comment)}
            value={rating}
          />

          <View style={{ margine: 10 }}>
            <Button
              onPress={() => {
                handleSubmit();
                resetForm();
              }}
              color="#5673DD"
              title="Submit"
            />
          </View>
          <View style={{ margin: 10 }}>
            <Button
              onPress={() => {
                setShowModal(!showModal);
                resetForm();
              }}
              color="#808080"
              title="Cancel"
            />
          </View>

          {/* <Text style={styles.modalTitle}>Search Campsite Reservations</Text>
          <Text style={styles.modalText}>Number of Campers: {campers}</Text>
          <Text style={styles.modalText}>
            Hike-In?: {hikeIn ? "Yes" : "No"}
          </Text>
          <Text style={styles.modalText}>
            Date: {date.toLocaleDateString("en-US")}
          </Text>
          <Button
            onPress={() => {
              setShowModal(!showModal);
              resetForm();
            }}
            color="#5637DD"
            title="Close"
          /> */}
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
});

export default CampsiteInfoScreen;
