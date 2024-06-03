import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { Table, Row } from 'react-native-table-component';
import { useSelector } from 'react-redux';
import { selectCustomerData } from '../../redux/authSlice';
//import { useTranslation } from 'react-i18next';
const formatDate = (inputDate) => {
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);
  return formattedDate;
};

const CustomerEmis = () => {
  //const { t } = useTranslation();
  const customerData = useSelector(selectCustomerData);
  const customerPhoneNumber = customerData?.['mobile number'] || 'N/A';
  const [activeLoanTables, setActiveLoanTables] = useState({});
  const [closedLoanTables, setClosedLoanTables] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modifiedMobileNumber = customerPhoneNumber.length > 10 ? customerPhoneNumber.slice(-10) : customerPhoneNumber;
        const response = await axios.get(`https://backendforpnf.vercel.app/emi?criteria=sheet_26521917.column_35.column_87%20LIKE%20%22%25${encodeURIComponent(modifiedMobileNumber)}%22`);
        //console.log("Emi response", response.data)
        const apiTableData = response.data.data.map((loan, index) => ({
          amount: loan.amount,
          eminumber: (index + 1).toString(),
          emiDate: loan['emi date'],
          paymentStatus: loan.status,
          statusColor: loan.status.toLowerCase() === 'paid' ? 'green' : 'red',
          loanId: loan['loan id'],
        }));
        //console.log("tableData",apiTableData);
        const groupedActiveTables = {};
        const groupedClosedTables = {};

        apiTableData.forEach((row) => {
          const loanID = row.loanId;
          if (!groupedActiveTables[loanID]) {
            groupedActiveTables[loanID] = [];
          }
          groupedActiveTables[loanID].push({
            ...row,
            emiNumber: (groupedActiveTables[loanID].length + 1).toString(),
          });
          if (!groupedClosedTables[loanID]) {
            groupedClosedTables[loanID] = [];
          }
          groupedClosedTables[loanID].push({
            ...row,
            emiNumber: (groupedClosedTables[loanID].length + 1).toString(),
          });
        });

        const sortedActiveLoanIds = Object.keys(groupedActiveTables)
          .sort((a, b) => parseInt(b) - parseInt(a));
        const sortedClosedLoanIds = Object.keys(groupedClosedTables)
          .sort((a, b) => parseInt(b) - parseInt(a));

        const sortedActiveLoanTables = {};
        const sortedClosedLoanTables = {};

        sortedActiveLoanIds.forEach((loanID) => {
          const hasUnpaidEmi = groupedActiveTables[loanID].some(emi => emi.paymentStatus.toLowerCase() === 'unpaid' || emi.paymentStatus.toLowerCase() === 'bounced');
          if (hasUnpaidEmi) {
            sortedActiveLoanTables[loanID] = groupedActiveTables[loanID];
          }
        });

        sortedClosedLoanIds.forEach((loanID) => {
          const allEmisPaid = groupedClosedTables[loanID].every(emi => emi.paymentStatus.toLowerCase() === 'paid');
          if (allEmisPaid) {
            sortedClosedLoanTables[loanID] = groupedClosedTables[loanID];
          }
        });

        setActiveLoanTables(sortedActiveLoanTables);
        setClosedLoanTables(sortedClosedLoanTables);
      } catch (error) {
        console.error('Error fetching data emi Data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerPhoneNumber]);

  const flexArr = [1.5, 1.5, 2, 2];
  const fontsize = 18;





  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>Active Loans</Text>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c82f6" />
          <Text style={styles.loadingText}>loading</Text>
        </View>
      )}
      {!loading && activeLoanTables && Object.entries(activeLoanTables)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([loanID, tableData]) => (
          <View key={loanID} style={styles.tableContainer}>
            <Text style={styles.loanIdText}>Loan Account {loanID}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
              <Row
                data={[
                    'EMI Number',
                    'EMI Due Date',
                    'Amount',
                    'Status'
                  ]}
                style={styles.head}
                textStyle={styles.headText}
                flexArr={flexArr}
              />
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    rowData.emiNumber,
                    formatDate(rowData.emiDate),
                    `₹ ${rowData.amount}`,
                    <Text
                      key={index}
                      style={{
                        ...styles.text,
                        color: rowData.statusColor === 'green' ? 'green' : 'red',
                        fontSize: fontsize,
                        fontWeight: '400',
                        margin: 6,
                        padding: 10,
                      }}
                    >
                      {rowData.paymentStatus.toLowerCase()}
                    </Text>,
                  ]}
                  style={styles.row}
                  textStyle={styles.text}
                  flexArr={flexArr}
                />
              ))}
            </Table>
          </View>
        ))}
      {!loading && Object.keys(activeLoanTables).length === 0 && (
        <Text style={styles.noEmiText}>noactiveloans</Text>
      )}
      <Text style={{ fontSize: 23, fontWeight: 'bold', color: 'black' }}>Closed Loans</Text>
      {!loading && closedLoanTables && Object.entries(closedLoanTables)
        .sort(([a], [b]) => parseInt(b) - parseInt(a))
        .map(([loanID, tableData]) => (
          <View key={loanID} style={styles.tableContainer}>
            <Text style={styles.loanIdText}>Loan Account: {loanID}</Text>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#e5e7eb', marginBottom: 10, marginTop: 10 }}>
              <Row
                 data={[
                    'EMI Number',
                    'EMI Due Date',
                    'Amount',
                    'Status'
                  ]}
                style={styles.head}
                textStyle={styles.headText}
                flexArr={flexArr}
              />
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={[
                    rowData.emiNumber,
                    formatDate(rowData.emiDate),
                    `₹ ${rowData.amount}`,
                    <Text
                      key={index}
                      style={{
                        ...styles.text,
                        color: rowData.statusColor === 'green' ? 'green' : 'red',
                        fontSize: fontsize,
                        fontWeight: '400',
                        margin: 6,
                        padding: 10,
                      }}
                    >
                      {rowData.paymentStatus.toLowerCase()}
                    </Text>,
                  ]}
                  style={styles.row}
                  textStyle={styles.text}
                  flexArr={flexArr}
                />
              ))}
            </Table>
          </View>
        ))}
      {!loading && Object.keys(closedLoanTables).length === 0 && (
        <Text style={styles.noEmiText}>noclosedloans
        
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'black',
    fontSize: 18,
    marginTop: 10,
  },
  head: {
    height: 60,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    flexDirection: 'row',
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
    margin: 6,
    color: 'black',
    fontWeight: '500',
  },
  headText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    height: 70,
    paddingTop: 15,
    alignItems: 'center',
  },
  
  row: { flexDirection: 'row', height: 70 },
  loanIdText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
    marginBottom: 10,
  },
  noEmiText: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },
  tableContainer: {
    marginBottom: 20,
  },
});




export default CustomerEmis;