import React from 'react'
import { Image, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import LogoIconn2 from '../assets/logo-kalbe CH-black.png';
import MerriRegular from '../fonts/Merriweather_24pt-Regular.ttf'
import HelveticaBold from '../fonts/Helvetica-Bold.ttf'

// Register FONT DISINI
Font.register({ family: 'MerriRegular', src: MerriRegular });
Font.register({ family: 'HelveticaBold', src: HelveticaBold });

// Style untuk PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    color: '#333',
    fontFamily: 'MerriRegular',
  },
  // Header styles
  header: {
    flexDirection: 'row',
    borderBottom: '2px solid #2c3e50',
    paddingBottom: 10,
    marginBottom: 20,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'column',
  },
  headerRight: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  logo: { 
    width: 120,
    marginBottom: 5,
  },
  addressText: {
    fontSize: 8,
    color: '#555',
    lineHeight: 1.4,
  },
  dateTime: {
    fontSize: 8,
    color: '#555',
    marginTop: 5,
  },
  // Title styles
  title: {
    fontSize: 16,
    fontFamily: 'HelveticaBold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2c3e50',
  },
  // Content styles
  contentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  itemContainer: {
    width: '48%', // Two columns layout
    marginBottom: 12,
    borderRadius: 4,
    border: '1px solid #eee',
    overflow: 'hidden',
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'HelveticaBold',
    backgroundColor: '#f0f0f0',
    padding: 6,
    color: '#2c3e50',
    borderBottom: '1px solid #ddd',
  },
  value: {
    fontSize: 10,
    color: '#555',
    padding: 6,
  },
  // Footer styles
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    fontSize: 8,
    textAlign: 'center',
    color: '#666',
    borderTop: '1px solid #ddd',
    paddingTop: 10,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 20,
    right: 30,
    fontSize: 8,
  },
});

// Header component with logo, address, and current date/time
const Header = () => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const currentTime = new Date().toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image style={styles.logo} src={LogoIconn2} />
      </View>
      <View style={styles.headerRight}>
        <Text style={styles.addressText}>Kawasan Greenland International Industrial Center (GIIC)</Text>
        <Text style={styles.addressText}>Blok BB No.6, Kota Deltamas</Text>
        <Text style={styles.addressText}>Cikarang 17530, Indonesia</Text>
        <Text style={styles.dateTime}>{currentDate} - {currentTime}</Text>
      </View>
    </View>
  );
};

// Footer component
const Footer = ({ pageNumber }) => (
  <View style={styles.footer}>
    <Text>Kalbe Consumer Health Report - Confidential</Text>
    <Text style={styles.pageNumber}>Page {pageNumber}</Text>
  </View>
);

// Main document component
const MyDocument = ({ dashboardData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Header />
      <Text style={styles.title}>KALBE CONSUMER HEALTH REPORTING</Text>
      
      <View style={styles.contentContainer}>
        {dashboardData.map((item, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.subtitle}>{item.title}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
      </View>
      
      <Footer pageNumber={2} />
    </Page>
  </Document>
);

export default MyDocument;