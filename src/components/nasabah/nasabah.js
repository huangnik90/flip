import React from 'react'
import {Link} from 'react-router-dom'
import { listNasabahFunction } from './saga';
import '../../support/style.css'
import {handleFormatDate, formatMoney} from './globalFunction'
import Logo from './../../support/img/logo.png'
class Home extends React.Component{
    state={
        rows:[],
        errorMessage:'',
        searchName:'',
        dropDownCommand:'',
        loading:true
    }

    _isMounted = false;
    componentDidMount(){
        this._isMounted = true
        this.getNasabahDetail()
    }

    UNSAFE_componentWillMount  (){
        this._isMounted = false
    }

    getNasabahDetail = async function () {
        const data = await listNasabahFunction()
        if(data){
          
          let result = Object.values(data.data) || []

          if(this.state.dropDownCommand && this.state.dropDownCommand === 'az'){
            result.sort((a,b)=> {  return a.beneficiary_name > b.beneficiary_name ? 1: -1})
          }else if(this.state.dropDownCommand && this.state.dropDownCommand === 'za'){
            result.sort((a,b)=> {  return a.beneficiary_name < b.beneficiary_name ? 1: -1})
          }else if(this.state.dropDownCommand && this.state.dropDownCommand === 'oldDate'){
            //logikanya tanggal saya convert menjadi integer memakai getTime()
            //inputnya berupa angka example output 10 mei 2020 menjadi 1589096140070 sampai ke detik
            //jadi dibuat perbandingan setiap tanggal
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

          this.setState({rows:result,loading:false})
          
        }else{
            this.setState({errorMessage:"Data Kosong"})
        }

    }

      handleFieldText=(e)=>{
        //karena datanya masih dikit, lebih efektif menggunakan onChange dan setiap karakter dimasukan di dalam state
        this.setState({searchName:e.target.value})
      }

      handleDropDown=(e)=>{
        //function ini untuk menghandle bagian dropdown
        //drop down saya categorikan menjadi 4 yaitu: az, za, tanggal terlama dan tanggal terbaru
        //sejak tanggal semua sama, saya belum test functionnya apakah berjalan..
     
        this.setState({dropDownCommand:e.target.value,searchName:"",loading:true},()=>{
          this.getNasabahDetail()
        })
      }
      getData =(id)=>{
        //function ini untuk menyimpan field yang terkait untuk page transaksi detail
        //object yang ditemukan bisa store di localStorage atau cookies
        //saya memilih localstorange karena data tidak saya ambil lagi dari server-side jadi localStorage cukup
        let data
        for (const key in this.state.rows){
          if(this.state.rows[key].id===id){
            data = this.state.rows[key]
          }
        }
        localStorage.setItem('myData', JSON.stringify(data));
      }

    renderJsx =()=>{

        //setelah ambil semua data dan di masukan ke state rows, saya pake function bawaan javascript filter 
        //filter dari nilai sender_bank dan beneficiary_name sesuai dengan field textbox 

        let searchFilter = this.state.rows.filter((val)=>{
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
                    
                      {formatMoney(val.amount)}  <i style={{fontSize:"0.5rem",paddingBottom:"2px",margin:"0px 5px 2px 5px"}} className="fas fa-circle fa-xs"></i>
                      {/* jika ingin menampilkan tanggal jam dd-mm-yyyy hh:mm:ss , tambahkan parameter kedua dari function ini true */}
                      {handleFormatDate(val.completed_at)}
                    </div>
                    <div className="divider"></div>
              
                    <div className="button">
                      <Link  style={{textDecoration:"none"}} to={`/detailTransaksi/${val.id}`}>
                        <div onClick={()=>this.getData(val.id)} className={`${val.status==="SUCCESS"?"btnIjo":"btnLain"}`}>
                         <span>
                         {val.status ==="SUCCESS"?"Berhasil":"Pengecekan"}
                        </span>
                        </div>
                      </Link>
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
              {this.state.loading ?
                  <div className="loadingProgress" id="sideColorOrange">
                       <center>
                          <img src={Logo} alt="Loading Logo" width="10%"/>
                            <br/>
                          <p>Loading..</p>
                      </center> 
                  </div>
              :
                  <div>
                        {this.state.rows?this.renderJsx():"..."}
                  </div>
              }
               
            </div>
        )
    }
}

export default Home