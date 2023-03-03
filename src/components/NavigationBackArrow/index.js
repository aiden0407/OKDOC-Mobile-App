//Core Components
import { TouchableOpacity } from 'react-native';

//Components
import { Ionicons } from '@expo/vector-icons';

export default function NavigationBackArrow({ action }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
    >
      <Ionicons name="chevron-back" size={26} />
    </TouchableOpacity>
  );
}