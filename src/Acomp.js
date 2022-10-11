import React, { useEffect, useState } from "react";

import "./App.css";

const Acomp = () => {
  const [info, setInfo] = useState([]);

  const [perPage, setPerPage] = useState(10);

  const [currPage, setCurrPage] = useState(1);

  let totalPages = Math.ceil(info.length / perPage);
  let pages = [...Array(totalPages + 1).keys()].slice(1);

  let lastTodoIndex = currPage * perPage;
  let firstTodoIndex = lastTodoIndex - perPage;

  let showTodos = info.slice(firstTodoIndex, lastTodoIndex);

  const prev = () => {
    if (currPage !== 1) {
      setCurrPage(currPage - 1);
    }
  };

  const next = () => {
    if (currPage !== totalPages) {
      setCurrPage(currPage + 1);
    }
  };

  const changeInfo = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => res.json())
      .then(setInfo);
  };

  useEffect(() => {
    changeInfo();
  }, []);

  return (
    <>
      <div className="bodyy">
        <div className="container bgImg">
          <h1 className="text-dan">Pagination Example</h1>
          <div
            style={{ borderRadius: "30px 0px 30px 0px" }}
            className="card shadow-lg"
          >
            <div className="row">
              <div className="col-sm-12">
                <div className="text-right">
                  <select
                    style={{ width: "150px" }}
                    className="form-control-sm m-3"
                    onChange={(e) => {
                      setCurrPage(1);
                      setPerPage(e.target.value);
                    }}
                  >
                    <option value="10">Select upto 10</option>
                    <option value="20">Select upto 20</option>
                    <option value="30">Select upto 30</option>
                    <option value="40">Select upto 40</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card-body align-items-center">
              <ul style={{ listStyleType: "none" }}>
                {showTodos.map((item) => {
                  return (
                    <li key={item.id}>
                      <span> {item.id}</span>. {item.title}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="row">
              <div className="col-12">
                <nav aria-label="Page navigation example">
                  <ul className="pagination flex-wrap justify-content-center">
                    <li className="page-item">
                      <a className="page-link" href="#" onClick={prev}>
                        Previous
                      </a>
                    </li>
                    {pages.map((val) => {
                      return (
                        <li className="page-item" key={val}>
                          <a
                            href="#"
                            className="page-link"
                            onClick={() => setCurrPage(val)}
                          >
                            {val}
                          </a>
                        </li>
                      );
                    })}

                    <li className="page-item">
                      <a className="page-link" href="#" onClick={next}>
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Acomp;
