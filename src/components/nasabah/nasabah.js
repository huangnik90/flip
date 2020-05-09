import React from 'react'
// import {Link} from 'react-router-dom'
import { listNasabahFunction } from './saga';
import '../../support/style.css'


class Home extends React.Component{
    state={
        rows:[],
        errorMessage:'',
        searchName:'',
        dropDownCommand:''
    }

    _isMounted = false;
    componentDidMount(){
        this._isMounted = true
        this.getNasabahDetail()
    }

    componentWillMount  (){
        this._isMounted = false
    }

    getNasabahDetail = async function () {
        const data = await listNasabahFunction()
        if(data){
          let result = Object.values(data.data)
          if(this.state.dropDownCommand && this.state.dropDownCommand === 'az'){
            result.sort((a,b)=> {  return a.beneficiary_name > b.beneficiary_name ? 1: -1})
          }else if(this.state.dropDownCommand && this.state.dropDownCommand === 'za'){
            result.sort((a,b)=> {  return a.beneficiary_name < b.beneficiary_name ? 1: -1})
          }else if(this.state.dropDownCommand && this.state.dropDownCommand === 'oldDate'){
            result.sort((a,b)=> {  
              let sortDate = new Date(a.completed_at);
              sortDate.getTime()
              return a.sortDate < b.sortDate ? 1: -1})
          }else if(this.state.dropDownCommand && this.state.dropDownCommand === 'latestDate'){
            result.sort((a,b)=> {  
              let sortDate = new Date(a.completed_at);
              sortDate.getTime()
              return a.sortDate > b.sortDate ? 1: -1})
          }

          this.setState({rows:result})
          
        }else{
            this.setState({errorMessage:"Data Kosong"})
        }

    }

    formatMoney=(number)=>
    { return number.toLocaleString('in-RP', {style : 'currency', currency: 'IDR', minimumFractionDigits: 0,
    maximumFractionDigits: 0})}

      handleFormatDate (dateBefore,time){
        let dateAfter = new Date(dateBefore);
      
        return `${dateAfter.getDate()} ${this.getMonthNow(dateAfter.getMonth().toString())} ${dateAfter.getFullYear()} ${time ? `${dateAfter.getHours()}:${dateAfter.getMinutes()}:${dateAfter.getSeconds()}`: ''}`;
      };
      
    getMonthNow(bulanNow) {
        let bulan = '';
      
        if(bulanNow) {
          if(bulanNow.toString() === '0') {
            bulan = 'Januari';
          } else if(bulanNow.toString() === '1') {
            bulan = 'Februari';
          } else if(bulanNow.toString() === '2') {
            bulan = 'Maret';
          } else if(bulanNow.toString() === '3') {
            bulan = 'April';
          } else if(bulanNow.toString() === '4') {
            bulan = 'Mei';
          } else if(bulanNow.toString() === '5') {
            bulan = 'Juni';
          } else if(bulanNow.toString() === '6') {
            bulan = 'Juli';
          } else if(bulanNow.toString() === '7') {
            bulan = 'Agustus';
          } else if(bulanNow.toString() === '8') {
            bulan = 'September';
          } else if(bulanNow.toString() === '9') {
            bulan = 'Oktober';
          } else if(bulanNow.toString() === '10') {
            bulan = 'November';
          } else if(bulanNow.toString() === '11') {
            bulan = 'Desember';
          }
        }  
        return bulan
      }
      handleFieldText=(e)=>{
        this.setState({searchName:e.target.value})
      }
      handleDropDown=(e)=>{
        this.setState({dropDownCommand:e.target.value,searchName:""},()=>{
          this.getNasabahDetail()
        })
      }

    renderJsx =()=>{
        let searchFilter
          searchFilter = this.state.rows.filter((val)=>{
            return val.beneficiary_name.toLowerCase().includes(this.state.searchName) || val.sender_bank.toLowerCase().includes(this.state.searchName) || val.beneficiary_bank.toLowerCase().includes(this.state.searchName)
          })
       
        var jsx = searchFilter.map((val,index)=>{
            return(
                <div className="container"  id={`${val.status==="SUCCESS"?"sideColorIjo":"sideColorOrange"}`} key={index}>
                    <div className="detailMinor">
                        <p>
                            <b>
                            {val.sender_bank.toUpperCase()} 
                            <i className="fas fa-arrow-right"></i>
                            {val.beneficiary_bank.toUpperCase()}
                            </b>
                        </p>

                         <p>{val.beneficiary_name}</p>
                    
                      {this.formatMoney(val.amount)}  <i style={{fontSize:"0.5rem",paddingBottom:"2px",margin:"0px 5px 2px 5px"}} className="fas fa-circle fa-xs"></i>
                      {this.handleFormatDate(val.completed_at)}
                    </div>
              
                    <div className="button">
                      <div className={`${val.status==="SUCCESS"?"btnIjo":"btnLain"}`}>
                         {val.status ==="SUCCESS"?"Berhasil":"Pengecekan"}
                      </div>
                    </div>
                </div>
            )
        })
        return jsx
    }


    render(){
        return(
            <div className="bigDocker"> 
                <div style={{paddingLeft:"15px"}}>
                    <h1>Daftar Transaksi</h1> 
                    <h3>Halo Kak!</h3>
                    <p>Kamu telah melakukan transaksi sebesar <label style={{color:"red",fontWeight:"bold"}}>Rp. 5,000,000 </label>sejak menggunakan Flip.</p>
                </div>
              <div className="searchMain">
                  <div className="searchGroup">
                    <i className="fas fa-search"></i>
                        <input type="text" onChange={this.handleFieldText} placeholder="Masukan nama atau bank"/>
                    </div>

                    <div className="dropDown">
                      <i  id="arrow" className="fas fa-angle-down"></i>
                      <select onChange={this.handleDropDown}>
                            <option value="">URUTKAN</option>
                            <option value="az">Nama A - Z</option>
                            <option value="za">Nama Z - A</option>
                            <option value="oldDate">Tanggal Terbaru</option>
                            <option value="latestDate">Tanggal Terlama</option>
                      </select>
                    
                    </div>
              </div>
                <div>
                  
                    {this.state.rows?this.renderJsx():"loading..."}

                </div>
            </div>
        )
    }
}

export default Home