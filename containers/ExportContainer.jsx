import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Button, ButtonToolbar } from 'react-bootstrap';

import { exportActions } from '../actions';
import { ExportFilterTextBox, ExportColumns, ExportSettings, ExportProgressDialog } from '../components';

export default class ExportContainer extends Component {
  componentWillMount = () => {
    this.props.getUserCount();
  }

  onExport = () => {
    const { columns, defaultColumns, settings } = this.props.export.toJS();
    this.props.exportUsers('', settings, columns, defaultColumns);
  }

  onQueryChanged = (e) => {
    this.props.getUserCount(e.target.value);
  }

  onAddColumn = ({ userAttribute, columnName }) => {
    this.props.addColumn(userAttribute, columnName);
  }

  onAddDefaultColumns = () => {
    const { defaultColumns } = this.props.export.toJS();
    defaultColumns.forEach(col => this.props.addColumn(col.userAttribute, col.columnName));
  }

  getExportTitle(query) {
    if (query && query.size) {
      const size = query.size > 100000 ? 100000 : query.size;
      return `Export ${size} Users`;
    }
    return 'Export';
  }

  inputStyle = { marginRight: '5px', width: '300px' }

  render() {
    const { query, columns } = this.props.export.toJS();

    return (
      <div>
        <ExportProgressDialog export={this.props.export} />
        <ExportFilterTextBox loading={query.loading} defaultValue="" onBlur={this.onQueryChanged} querySize={query.size} />
        <ExportColumns columns={columns}
          onAddDefaultColumns={this.onAddDefaultColumns} onAddColumn={this.onAddColumn} onRemoveColumn={this.props.removeColumn}
        />
        <ExportSettings export={this.props.export} onChange={this.props.updateSettings} />
        <div className="row">
          <div className="col-xs-12">
            <ButtonToolbar>
              <Button bsStyle="primary" bsSize="small" disabled={false} onClick={this.onExport}>
                {this.getExportTitle(query)}
              </Button>
              <Button bsStyle="default" bsSize="small" disabled={false}>
                Preview
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      </div>
    );
  }
}

ExportContainer.propTypes = {
  export: PropTypes.object.isRequired,
  addColumn: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  getUserCount: PropTypes.func.isRequired,
  exportUsers: PropTypes.func.isRequired,
  updateSettings: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    export: state.export
  };
}

export default connect(mapStateToProps, { ...exportActions })(ExportContainer);
