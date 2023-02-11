import React from "react";
import { Link } from 'react-router-dom';

var id = "QQ000";
const host = "localhost"
const port = 9103



export default class AdminQuestionnaire extends React.Component {
    constructor(props) {
        super(props);
        
        this.exportCSV = this.exportCSV.bind(this);
        this.exportJSON = this.exportJSON.bind(this);

        this.state = {
            id: '',
        };
      }


      exportCSV() {
        const id  = this.state.id;
        const DownloadCSV_URL = `http://${host}:${port}/intelliq_api/questionnaire/${id}?format=csv`;
      
        fetch(DownloadCSV_URL, {
          headers: {
            "Accept-Charset": "utf-8",
            "mode": "no-cors",
            "Content-Type": "application/w-xxx-form-urlencoded",
          }})
        .then(response => {
          return response.text();
        })
        .then(text => {
          console.log(text);
          console.log(DownloadCSV_URL);
          const utf8EncodedCsv = new TextEncoder("UTF-8").encode(text);
          const blob = new Blob([utf8EncodedCsv], { type: 'text/csv;charset=utf-8;' });
          //var csv = new Blob([text], { type: 'text/csv;charset=utf-8' });
          var link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'data.csv';
          link.click();
        })
        .catch(error => {
          console.error(error);
        
        });
        };
        
      
        exportJSON() {
          const id = this.state.id;
          const DownloadJSON_URL = `http://${host}:${port}/intelliq_api/questionnaire/${id}`;
      
          fetch(DownloadJSON_URL, {
            headers: {
              "Accept-Charset": "utf-8",
              "mode": "no-cors",
              "Content-Type": "application/w-xxx-form-urlencoded",
            }})
          .then(response => {
            response.blob().then(blob => {
              let url = window.URL.createObjectURL(blob);
              let a = document.createElement("a");
              a.style.display = "none";
              a.href = url;
              a.download = "data.json";
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            });
          })
          .catch(error => console.error(error));
          };
      
          

    
    render() {
    return (
      <div>

      <input type="text" placeholder="ID" onChange={(event) => this.setState({ id: event.target.value })} />
          <button className="button" onClick={this.exportCSV}>Export CSV</button>
    <button className="button" onClick={this.exportJSON}>Export JSON</button>
        
        <br />
        
      <div className="buttons">
        <Link to={`/Admin/Questionnaires/${id}/Graphs`}> <button className="button" >Graphs</button></Link>
        <Link to={"/Admin"}> <button className="button" >Back</button></Link>
      </div>
      <p>Let's see amazing graphs</p>
      </div>
  );
}
}