import '../../support/style.css'
import React from 'react'

class NasabahDetail extends React.Component{
    state={
        detailTrans:[]
    }
    
    componentDidMount(){
        var detail = localStorage.getItem("myData")
        this.setState({detailTrans:detail})
    }

    

  
    render(){
        return(
            <div className="bigDocker"> 
              <div style={{paddingLeft:"15px"}}>
                    <h1>Detail Transaksi</h1> 
              </div>
                 {this.state.detailTrans.amount}

            </div>
        )
    }
}

export default NasabahDetail