import { useRef } from "react";
import { useHistory } from "react-router-dom";

const SearchInput = () => {
    const inputRef = useRef<HTMLInputElement>(null!);
    const history = useHistory();

    const clickHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchValue = inputRef.current.value;
        if (searchValue) {
            history.push(`/products/All?search=${searchValue}`);
            inputRef.current.value = "";
        }
    };

    return (
        <form className="navbar__search" onSubmit={(e) => clickHandler(e)}>
            <input ref={inputRef} className="navbar__search-input" type="text" />
            <button className="navbar__search-btn" type="submit" aria-label="search">
                Search
      </button>
        </form>
    );
};

export default SearchInput;
