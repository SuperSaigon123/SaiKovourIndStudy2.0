import React, { useState } from 'react';
import { View, Text, Image, Video } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default MediaScreen = ({ route }) => {
  // Extract parameters from the navigation route
  const { mediaType, mediaUri, checkboxArray } = route.params;

  // State to keep track of checked checkboxes
  const [checkedItems, setCheckedItems] = useState([]);

  // Function to toggle the checked state of a checkbox
  const handleCheckboxToggle = (index) => {
    // Create a copy of the current checkedItems array
    const updatedCheckedItems = [...checkedItems];
    // Toggle the checked state of the specified checkbox
    updatedCheckedItems[index] = !updatedCheckedItems[index];
    // Update the state with the modified array
    setCheckedItems(updatedCheckedItems);
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* Display the image or video based on the mediaType */}
      {mediaType === 'photo' ? (
        <Image source={{ uri: mediaUri }} style={{ width: 200, height: 200 }} />
      ) : mediaType === 'video' ? (
        <Video
          source={{ uri: mediaUri }}
          style={{ width: 200, height: 200 }}
          controls
        />
      ) : (
        <Text>Invalid media type</Text>
      )}

      <View style={{ marginTop: 20 }}>
        {/* Render checkboxes based on the length of the checkboxArray */}
        {checkboxArray.map((checkbox, index) => (
          <CheckBox
            key={index}
            title={`Checkbox ${index + 1}`}
            checked={checkedItems[index] || false}
            onPress={() => handleCheckboxToggle(index)}
          />
        ))}
      </View>
    </View>
  );
};
