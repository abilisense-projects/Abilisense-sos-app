import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import FitImage from 'react-native-fit-image';
import {
  Container,
  Content,
  Header,
  Footer,
  Body,
  FooterTab,
  Icon,
  Card,
  CardItem
} from 'native-base';
import moment from 'moment';
import {FormLabel, FormInput, Button} from 'react-native-elements';
import { DatePickerDialog } from 'react-native-datepicker-dialog';
import HTMLView from 'react-native-htmlview';

    export default class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      dobText: '',
      dobDate: null,
      journeyText: '',
      journeyDate: null,

      name:'',
      surname:'',
      email:'',
      mobilenumber:'',
      password:'',
      dateofbirth:'',
    }
  }
  onDOBPress = () => {
    let dobDate = this.state.dobDate;

    if(!dobDate || dobDate == null){
      dobDate = new Date();
      this.setState({
        dobDate: dobDate
      });
    }

    //To open the dialog
    this.refs.dobDialog.open({
      date: dobDate,
      maxDate: new Date() //To restirct future date
    });

  }
  onDOBDatePicked = (date) => {
   this.setState({
     dobDate: date,
     dobText: moment(date).format('DD-MMM-YYYY')
   });
 }





 Signup=()=>{
   Alert.alert("You pressed me");
   Alert.alert(this.state.name);
   Alert.alert(this.state.dobText);

 }

  render() {

    return (

      <View>
        <ScrollView>
          <Card>
            <CardItem>
            <Content>



        <KeyboardAvoidingView behavior="padding" >
          <FormLabel>Name</FormLabel>
          <FormInput onChangeText={name=>this.setState({name})}/>
          <FormLabel>Surname</FormLabel>
          <FormInput onChangeText={surname=>this.setState({surname})}/>
          <FormLabel>Date of Birth</FormLabel>
          <TouchableOpacity onPress={this.onDOBPress.bind(this)} onChangeText=
        {dateofbirth=>this.setState({dateofbirth})}>
            <View style={styles.datePickerBox}>
              <Text style={styles.datePickerText}>{this.state.dobText}</Text>
              <DatePickerDialog ref="dobDialog" onDatePicked={this.onDOBDatePicked.bind(this)} />
            </View>
          </TouchableOpacity>


          <FormLabel>Email</FormLabel>
          <FormInput onChangeText={email=>this.setState({email})}/>
          <FormLabel>Mobile Number</FormLabel>
          <FormInput onChangeText={mobilenumber=>this.setState({mobilenumber})}/>
          <FormLabel>Password</FormLabel>
          <FormInput secureTextEntry onChangeText={password=>this.setState({password})}/>
          <TouchableOpacity >
            <Button
              icon={{name: 'send'}}
              title='Submit Details'
              backgroundColor="#4286f4"
              onPress={this.Signup}
            />
          </TouchableOpacity>
        </KeyboardAvoidingView>
        </Content>
      </CardItem>

      </Card>
    </ScrollView>
  </View>

);

  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  Label:{
    fontSize: 20,
  },
  form: {
    alignSelf: 'stretch',
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle: {
    width: 250,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'lightgreen'
  },
  TouchStyle: {
    width: 250,
    backgroundColor: 'blue',
    justifyContent: 'center',
    marginTop: 20
  },
  TouchText: {
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    color: 'white'
  },
  content: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  datePickerBox:{
   marginTop: 9,
   borderColor: '#ABABAB',
   borderWidth: 0.5,
   padding: 0,
   borderTopLeftRadius: 4,
   borderTopRightRadius: 4,
   borderBottomLeftRadius: 4,
   borderBottomRightRadius: 4,
   height: 28,
   justifyContent:'center'
 },
  datePickerText: {
    fontSize: 14,
    marginLeft: 5,
    borderWidth: 0,
    color: '#121212',
  },
});