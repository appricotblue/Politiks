import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const ShowMoreText = ({ text, maxLength }) => {
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <View style={{marginBottom:10}}>
      <Text>
        {showAll ? text : text.slice(0, maxLength)}
        {text.length > maxLength && (
          <TouchableOpacity onPress={toggleShowAll}>
            <Text style={{ color: 'black' ,fontSize:18,fontFamily:'Jost',fontWeight:'600'}}>
              {showAll ? '..less' : ' ..More'}
            </Text>
          </TouchableOpacity>
        )}
      </Text>
    </View>
  );
};

export default ShowMoreText;
