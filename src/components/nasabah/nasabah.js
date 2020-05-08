import React from 'react'
// import {Link} from 'react-router-dom'
import { listNasabahFunction } from './saga';
import '../../support/style.css'


class Home extends React.Component{
    state={
        rows:[],
        errorMessage:''
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
            //ambil hanya data aja yang object
            let result = Object.values(data.data)
            //masukin ke state biar gampang rendering
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


    renderJsx =()=>{
        var jsx = this.state.rows.map((val,index)=>{
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
                    {this.formatMoney(val.amount)} 
                        <i style={{fontSize:"0.5rem",paddingBottom:"2px",margin:"0px 5px 2px 5px"}} className="fas fa-circle fa-xs"></i>
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
             
                <input type="text" placeholder="Masukan Nama atau Bank"/> 
                
                <div>
                    {this.renderJsx()}
                </div>
            </div>
        )
    }
}

export default Home