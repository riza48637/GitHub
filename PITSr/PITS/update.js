import React, {useState,Component,useEffect} from 'react';
import { Animated,ScrollView,Text,StyleSheet, Button,View,Alert,TextInput,TouchableOpacity,ImageBackground, Dimensions, StatusBar,Image,CheckBox,Picker} from 'react-native';
import Axios from 'axios';
import { TOKEN } from './config';
import ImageZoom from 'react-native-image-pan-zoom';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
const { width, height } = Dimensions.get('window')
	



  
export default class update extends Component{

    

  constructor(props) {
		super(props);

		this.state = {
        
                disabled1:true,disabled:true,
                show:false, show1:false,show2:false,show3:false,
                kargorol:null,kargoname:null,kargoscno:null,cln:null,Selected1:null,
                check1:false,check2:false,check3:false,check4:false,calendershow1:false,completedshow:false,postponedshow:false,filePath: {},photo: null }  
                this.onDayPress = this.onDayPress.bind(this);
    }
    onDayPress(day) {
        this.setState({
          Selected1: day.dateString
        })};
    
        chooseFile = () => {
            var options = {
              title: 'Select Image',
              customButtons: [
                { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
              ],
              storageOptions: {
                skipBackup: true,
                path: 'images',
              },
            };
            ImagePicker.showImagePicker(options, response => {
              console.log('Response = ', response);
         
              if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
                alert(response.customButton);
              } else {
                let source = response;
                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({
                  filePath: source,
                  photo:source,
                });
              }
            });
          };
          handleUploadPhoto = () => {
            var photo = {
              uri: this.state.filePath.uri,
              type: this.state.filePath.type,
              name: this.state.filePath.fileName,
          };
           
          var formData = new FormData(); 
          //append created photo{} to formdata
          formData.append('image', photo);
          //use axios to POST
          Axios({
              method: 'POST',
              url: 'https://imgyukle.com/api/1/(action)',
              data: formData,
              headers: {
                  'Authorization': '',
                  'Accept': 'application/json',
                  'Content-Type': 'multipart/form-data;'    
              }}) .then(function (response) { console.log(response)})
              .catch(function (error) { console.log(error.response)
          });
        };
        checkboxTest1(){
            this.setState({
             check1:!this.state.check1
           })
          if(this.state.check1==true)
          {
          this.setState({completedshow: false });
          }
          else {
          this.setState({ completedshow: true,check3:false,check2:false,check4:false,postponedshow:false });
          }
          }
          checkboxTest2(){
              this.setState({
              check2:!this.state.check2
             })
            if(this.state.check2==true)
            {
            this.setState({  });
            }
            else {
            this.setState({ show2: true,check3:false,check1:false,check4:false,postponedshow:false,completedshow: false });
            }
            }
            checkboxTest3(){
            this.setState({
            check3:!this.state.check3 })
                  if(this.state.check3==true)
                  {
                  this.setState({  });
                  }
                  else {
                  this.setState({ check2:false,check1:false,check4:false,postponedshow:false,completedshow: false});
                  }
            }
            checkboxTest4(){
                this.setState({
                    check4:!this.state.check4
                   })
                  if(this.state.check4==true)
                  {
                  this.setState({ postponedshow: false });
                  }
                  else {
                  this.setState({ postponedshow: true,check3:false,check1:false,check2:false,completedshow: false });
                  } 
                }
                  calenderhide1(){
            
                    this.state.cln=this.state.cln+1;
                   
                    if(this.state.cln==1){
                        this.setState({ calendershow1: true }); 
                     }
                     else{
                        this.setState({ calendershow1: false });
                        this.state.cln=0;
                     }
                  }



        render(){
  
            console.disableYellowBox = true;
             return (
             <ImageBackground source={require('./img/blue.jpg')} style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height,flex:1,}}>
              <StatusBar barStyle={'dark-content'} backgroundColor={'#222'} />
              <ScrollView style={styles.container}>
              <View style={styles.wall1}>
                 <Text style={ {fontSize:16,color:'aliceblue',fontWeight: 'bold',}}>
                    Görev Açıklaması
                 </Text>
                 </View>
                     <TextInput
                         value={this.state.isim}
                         ref={input => { this.textInput = input }}
                         onChangeText={(value) => this.setState({isim: value})}
                         style={{flex:1,height:'auto', borderColor: 'lightblue', borderWidth: 3 ,backgroundColor:'rgba(255,255,255,0.95)',marginHorizontal:40,textAlign:'center'}}
                       
                         keyboardType='default'
                    />
     <View style={styles.projectstatus}>
            <Text style={ {fontSize:16,color:'aliceblue',fontWeight: 'bold',}}>
                Görev Durumu
             </Text>
        </View>
     <View style={{flexDirection:'row',textAlign:'center',justifyContent:'center',marginHorizontal:40,alignItems:"center",marginTop:3}}>
     <View style={{flexDirection:'column',backgroundColor:'rgba(255,255,255,0.60)',alignItems:"center",justifyContent:'center',borderColor: 'lightblue', borderWidth: 3,marginTop:-3,borderRightWidth:0,flex:1}}>
            <Text style={ {fontSize:14,color:'midnightblue',fontWeight: 'bold',marginTop:5}}>
                Tamamlandı
             </Text>              
     <CheckBox
         value={this.state.check1}
         onValueChange={() => this.checkboxTest1()}
        />
        <Text style={ {fontSize:14,color:'midnightblue',fontWeight: 'bold',marginTop:5}}>
             Tamamlanmadı
          </Text>        
         <CheckBox
            value={this.state.check2}
            onValueChange={() => this.checkboxTest2()}
         />
         </View>
            <View style={{flexDirection:'column',backgroundColor:'rgba(255,255,255,0.60)',borderColor: 'lightblue', borderWidth: 3,marginTop:-3,textAlign:'center',justifyContent:'center',flex:1,alignItems:"center"}}>
                 <Text style={ {fontSize:14,color:'midnightblue',fontWeight: 'bold',marginTop:5,}}>
                      Devam Ediyor
                 </Text>              
         <CheckBox
             value={this.state.check3}
            onValueChange={() => this.checkboxTest3()}
              />
                <Text style={ {fontSize:14,color:'midnightblue',fontWeight: 'bold',marginTop:5,}}>
                 Ertelendi
                 </Text>        
             <CheckBox
                 value={this.state.check4}
                 onValueChange={() => this.checkboxTest4()}
                 />
                 </View>
          </View>
          { this.state.completedshow ? (
          <View style={styles.date}>
               <TouchableOpacity
                   style={{flex:1,justifyContent:'center',alignItems:'center',}}
                   onPress={() => this.calenderhide1()}
                  >
                <Text style={{fontWeight: 'bold',color:'white',fontSize:16}}>Görev Tamamlanma Tarihi</Text>
               </TouchableOpacity>
                 </View>
                      ) : null}
                       { this.state.completedshow ? (
                     <TextInput
                         value={this.state.Selected1}
                         ref={input => { this.textInput = input }}
                         onChangeText={(value) => this.setState({date12: value})}
                         style={{flex:1,height:40, borderColor: 'lightblue', borderWidth: 3 ,backgroundColor:'rgba(255,255,255,0.80)',textAlign:'center',marginHorizontal:40}}
                         placeholder='Görev Başlangıç Tarihi'
                         keyboardType='default'
                    />
                    ) : null}
                     { this.state.postponedshow ? (
                      <View style={styles.date}>
               <TouchableOpacity
                   style={{flex:1,justifyContent:'center',alignItems:'center',}}
                   onPress={() => this.calenderhide1()}
                  >
                <Text style={{fontWeight: 'bold',color:'white',fontSize:16}}>Görev Ertelenme Tarihi</Text>
               </TouchableOpacity>
                 </View>
                  ) : null}
                    { this.state.postponedshow ? (
                     <TextInput
                         value={this.state.Selected1}
                         ref={input => { this.textInput = input }}
                         onChangeText={(value) => this.setState({date12: value})}
                         style={{flex:1,height:40, borderColor: 'lightblue', borderWidth: 3 ,backgroundColor:'rgba(255,255,255,0.80)',textAlign:'center',marginHorizontal:40}}
                         placeholder='Görev Başlangıç Tarihi'
                         keyboardType='default'
                    />
                    ) : null}
                     { this.state.calendershow1 ? (
                        <Calendar
                        onDayPress={this.onDayPress}
                         hideExtraDays
                         showWeekNumbers
                         markedDates={{[this.state.Selected1]: {selected: true,mrked:true, selectedColor: 'green'}}}
                         />
                        ) : null}
                                 <Image
         /*  source={{
              uri: 'data:image/jpeg;base64,' + this.state.filePath.data,
            }}
            style={{ width: 100, height: 100 }}*/
          />
           <View style={styles.photo}>
                                     <Text style={ {fontSize:16,color:'aliceblue',fontWeight: 'bold',}}>
                                         Fotoğraf
                                     </Text>
                                  </View>
         < View style={{alignItems:"center",marginTop:0,}}>
          <Image
            source={{ uri: this.state.filePath.uri }}
            style={{ width: 200, height: 200, alignItems:'center',borderWidth:2,borderColor:'rgba(45,100,250,0.50)',backgroundColor:'aliceblue'}}
          />
        </View>
        <View style={styles.filetransfer}>
             <TouchableOpacity
             style={{flex:1,justifyContent:'center',alignItems:'center',marginRight:10,backgroundColor: 'rgba(45,100,250,0.50)',height:30}}
             onPress={this.chooseFile.bind(this)}  >
             <Text style={{fontWeight: 'bold',color:'white',fontSize:15}}>Dosya Seçiniz</Text>
             </TouchableOpacity>
         
             <TouchableOpacity
             style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'rgba(45,100,250,0.50)',height:30}}
             OnPress={this.handleUploadPhoto} >
             <Text style={{fontWeight: 'bold',color:'white',fontSize:15}}>Fotoğraf Gönder</Text>
             </TouchableOpacity>
           </View>
           <View style={styles.saved}>
             <TouchableOpacity
             style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor: 'rgba(45,100,250,0.50)',height:30}}
             onPress={() => {this.props.navigation.navigate('view')}} >
             <Text style={{fontWeight: 'bold',color:'white',fontSize:15}}>Görevi Kaydet</Text>
             </TouchableOpacity>
             </View>
      </ScrollView>
    </ImageBackground>
  );} 
}
   


const styles = StyleSheet.create({
container:{
    flex:1,
},
header:{
    flex:1,
    marginTop:10,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(45,100,250,0.50)',
    marginHorizontal:40
},
calendar:
{
   flex:1,
   marginHorizontal:40,
   backgroundColor:'rgba(45,100,250,0.50)',
   borderWidth:3,
   borderColor:'rgba(45,100,250,0.50)',
 
},
text:
{
   flex:1,
   marginTop:20,
   marginHorizontal:40,
   backgroundColor:'rgba(45,100,300,0.70)',
},
wall:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'rgba(45,100,250,0.50)',
     borderColor:'skyblue',height:40
},
wall1:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'rgba(45,100,250,0.50)',
    marginTop:5,
    borderWidth:2,
    marginHorizontal:40,
    borderColor:'skyblue'
},
wall2:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'rgba(45,100,250,0.50)',
    marginTop:20,
    borderWidth:2,
    marginHorizontal:40,
    borderColor:'skyblue'
},
saved:{
    
  marginTop:10,
  
  borderRadius:5,
  flex:1,
  height:35,
  marginHorizontal:90,
  marginBottom:20,
 
  textAlign:'center',
  justifyContent:'center'
 
},
  projectstatus:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:'rgba(45,100,250,0.50)',
    marginTop:10,
    borderWidth:2,
    marginHorizontal:40,
    borderColor:'skyblue',
    },
    date:{
     flex:1,
    backgroundColor:'rgba(45,100,250,0.50)',
        marginTop:10,
        borderWidth:2,
        borderColor:'skyblue',
        alignItems:"center",
        justifyContent:"center",
        marginHorizontal:40
        },
        filetransfer:{
          flexDirection:"row",
          marginTop:10,
          borderRadius:5,
          flex:1,
          height:35,
          marginHorizontal:50,
          marginBottom:20,
          padding:10,
          textAlign:'center',
          justifyContent:'center'
       },
       photo:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:'rgba(45,100,250,0.50)',
        marginTop:20,
        borderWidth:2,
        marginHorizontal:105,
        borderColor:'skyblue',
        },
});