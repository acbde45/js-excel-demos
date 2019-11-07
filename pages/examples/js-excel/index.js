import React, { Component } from 'react';
import { Button, Icon, message } from 'antd';
import {
  ACCEPTABLE_FILE_TYPE,
  CONVERTED_DATA_TYPE,
  readExcel,
  exportExcel,
} from '../../../components/common/JSExcel';
import '../index.css';

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      workbook: null,
      fileName: null,
    }
  }

  readWorkbookFromLocalFile = async event => {
    try {
      const { workbook, data, file } = await readExcel(event, CONVERTED_DATA_TYPE.CSV);
      console.log(workbook);
      this.setState({
        workbook,
        fileName: file.name,
      })
      this.readWorkbook(data);
    } catch(e) {
      message.error(e.message);
    }
  };

  readWorkbook = csv => {
    document.getElementById('result').innerHTML = this.csv2table(csv);
  };

  csv2table = csv => {
    let html = '<table border="1" cellspacing="0" cellpadding="8">';
    const rows = csv.split('\n');
    rows.pop(); // 最后一行没用的
    rows.forEach(function(row, idx) {
      var columns = row.split(',');
      columns.unshift(idx + 1); // 添加行索引
      if (idx == 0) {
        // 添加列索引
        html += '<tr>';
        for (var i = 0; i < columns.length; i++) {
          html +=
            '<th>' + (i == 0 ? '' : String.fromCharCode(65 + i - 1)) + '</th>';
        }
        html += '</tr>';
      }
      html += '<tr>';
      columns.forEach(function(column) {
        html += '<td>' + column + '</td>';
      });
      html += '</tr>';
    });
    html += '</table>';
    return html;
  };

  exportExcel = () => {
    const { workbook, fileName } = this.state;
    exportExcel(workbook, fileName);
  }

  render() {
    const { workbook, fileName } = this.state;

    return ( 
      <div style={{ padding: 24 }}>
        <Button className="upload-wrap">
          <Icon type="upload" />
          <input
            className="file-uploader"
            type="file"
            accept={ACCEPTABLE_FILE_TYPE}
            onChange={this.readWorkbookFromLocalFile}
          />
          <span className="upload-text">上传文件</span>
        </Button>
        <p className="upload-tip">支持 .xlsx、.xls 格式的文件</p>
        <Button style={{ marginTop: 16, marginLeft: 16 }} onClick={this.testAppendAOAToWorkSheet}>
          导出
        </Button>
        <p>结果输出：</p>
        <div id="result"></div>
      </div>
    );
  }
}
