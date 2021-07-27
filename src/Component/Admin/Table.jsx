import React, { Component } from "react";
import Pagination from "react-js-pagination";

function ListHead(props) {
    return props.ths.map((th, index) => {
        if (index === props.ths.length - 1 && props.isEdit === true) {
            return (
                <th colSpan="2" key={index}>
                    {th}
                </th>
            );
        } else {
            return <th key={index}>{th}</th>;
        }
    });
}

function Render(props) {
    var data = [];
    for (let index = 0; index < props.bodys.length; index++) {
        data.push(
            <tr key={index}>
                {Object.values(props.bodys[index]).map((td, index) => (
                    <td key={index}>{td}</td>
                ))}
            </tr>
        );
    }
    return data;
}
class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            perPage: 10,
        };
        this.handlePage = this.handlePage.bind(this);
    }

    handlePage(event) {
        this.setState({
            currentPage: event,
        });
    }

    render() {
        const { currentPage, perPage } = this.state;

        // Logic for displaying todos
        const indexOfLastApplicant = currentPage * perPage;
        const indexOfFirstApplicant = indexOfLastApplicant - perPage;
        const currentApplicants = this.props.body.slice(
            indexOfFirstApplicant,
            indexOfLastApplicant
        );

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.body.length / perPage); i++) {
            pageNumbers.push(i);
        }

        const renderPageNumbers = () => {
            if (pageNumbers.length >= 1) {
                return (
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                        }}>
                        <Pagination
                            itemClass="page-item"
                            linkClass="page-link"
                            activePage={this.state.currentPage}
                            itemsCountPerPage={this.state.perPage}
                            totalItemsCount={this.props.body.length}
                            pageRangeDisplayed={5}
                            onChange={this.handlePage}
                        />
                    </div>
                );
            }
        };

        return (
            <div className="show-data">
                <table id="table">
                    <thead>
                        <tr
                            style={{
                                background: this.props.headBackground,
                                color: this.props.headColor,
                            }}>
                            <ListHead
                                ths={this.props.head}
                                isEdit={this.props.isEdit}
                            />
                        </tr>
                    </thead>
                    <tbody>
                        <Render bodys={currentApplicants} />
                    </tbody>
                </table>
                {this.props.page === true && renderPageNumbers()}
            </div>
        );
    }
}

export default Table;
