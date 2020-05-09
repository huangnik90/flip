import '../../support/detailStyle.css'
import React from 'react'
import {formatMoney,handleFormatDate} from './globalFunction'
import {Redirect} from 'react-router-dom'
class NasabahDetail extends React.Component{
    state={
        detailTrans:[],
        return:false
    }
    
    componentDidMount(){
        var detail = JSON.parse(localStorage.getItem('myData'));
        this.setState({detailTrans:detail})
    }

    btnBack =()=>{
        localStorage.clear();
        this.setState({return:true})
    }
  
    render(){
        if(this.state.return){
            return(
                <Redirect to="/"></Redirect>
            )
        }
        return(
            <div className="bigDocker"> 

                <div style={{paddingLeft:"15px"}}>
                    <h1>Detail Transaksi</h1> 
                </div>

                <div className="detailContainer">
                    <div className="firstRow">
                        <div id="kanan">
                        <b> <p>ID TRANSAKSI: {this.state.detailTrans.id}</p></b>
                        </div>
                        <div className="middle"></div>
                        <div id="kiri">
                            <input type="button" className={this.state.detailTrans.status==="SUCCESS"?"btnSuccess":"btnPending"} 
                            value={this.state.detailTrans.status ==="SUCCESS"?"Berhasil":"Pengecekan"}></input>
                        </div>
                    </div>
                </div>

                <div className="detailContainer">
                    <div className="secondRow">
                        <div className="logo">
                            <i style={{color:"#FD6442"}} className="fas fa-inbox fa-3x"></i>
                        </div>
                        <div className="mainDetail">
                            <p>
                                <b>PENGIRIM</b>
                                <br/>
                                {this.state.detailTrans.sender_bank && this.state.detailTrans.sender_bank.toUpperCase()}
                            </p>
                            <p>
                                <b>PENERIMA</b>
                                <br/>
                                {this.state.detailTrans.beneficiary_bank && this.state.detailTrans.beneficiary_bank.toUpperCase()}<br/>
                                {this.state.detailTrans.account_number}<br/>
                                {this.state.detailTrans.beneficiary_name}
                            </p>
                            <p>
                                <b>NOMINAL</b>
                                <br/>
                                {this.state.detailTrans.amount && formatMoney(this.state.detailTrans.amount)}<br/>
                                Kode Unik: {this.state.detailTrans.unique_code} 
                            </p>
                            <p>
                                <b>CATATAN</b>
                                <br/>
                                {this.state.detailTrans.remark}
                            </p>
                            <p>
                                <b>WAKTU DIBUAT</b>
                                <br/>
                                {this.state.detailTrans.created_at && handleFormatDate(this.state.detailTrans.created_at)}<br/>
                            </p>
                        </div>
                    </div>
                </div>
                <input type="button" className="btnBack" onClick={this.btnBack} value="Kembali"/>

            </div>
        )
    }
}

export default NasabahDetail