import React from 'react';

export const Search = (props) => {

    function handleKey(e){
        if (e.keyCode == 13)
            document.getElementById("submit").click();
    }

    return (
        <div className="search">
            <input id="searchName" className="txtSearch" type="text" placeholder="Pesquisar..." value={props.searchTag} onChange={props.handleChange} onKeyUp={handleKey}/>                            
            <a id="submit" href={props.searchTag ? `/?search=${props.searchTag}` : ""}>
                <img className="btnSearch" src="/search.png" />
            </a>
        </div>
    );
}