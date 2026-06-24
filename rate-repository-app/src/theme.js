import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#646262ff',
    primary: '#0a62c7ff',
    appBar: '#24292e',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: {
      fontFamily: Platform.select({
        android: 'Roboto',
        ios: 'Arial',
        default: 'System'
      })
    }
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;