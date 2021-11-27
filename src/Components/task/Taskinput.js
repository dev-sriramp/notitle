import React from "react";

const Taskinput = () =>{
    return(
        <div>
            <div class="table-responsive">
            <table class="table">
                <thead class="table-dark">
                    <tr>
                    <th scope="col">No</th>
                    <th scope="col">Date</th>
                    <th scope="col">Workstartion</th>
                    <th scope="col">Model</th>
                    <th scope="col">Planned count</th>
                    <th scope="col">Planned time</th>
                    <th scope="col"> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="count"></input>
                    </td>
                    <td>
                    <select class="form-select" aria-label="Default select example">
                            <option selected>Select workstartion</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </td>
                    <td>
                    <select class="form-select" aria-label="Default select example">
                            <option selected>Select Model</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </td>
                    <td>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="count"></input>
                   
                    </td>
                    <td>
                    <input type="time" class="form-control" id="exampleFormControlInput1"></input>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    </button>
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>
                    <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="count"></input>
                    </td>
                    <td>
                    <select class="form-select" aria-label="Default select example">
                            <option selected>Select workstartion</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </td>
                    <td>
                    <select class="form-select" aria-label="Default select example">
                            <option selected>Select Model</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </td>
                    <td>
                    <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="count"></input>
                   
                    </td>
                    <td>
                   <input type="time" class="form-control" id="exampleFormControlInput1"></input>
                    </td>
                    <td>
                    <button type="button" class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                    </button>
                    </td>
                    </tr>
                    
                </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default Taskinput;