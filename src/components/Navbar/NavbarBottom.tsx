import React from 'react'
import categories from "../../assets/data/categories";
import {NavLink} from "react-router-dom";

const NavbarBottom = () => {
    return (
        <nav className="navBottom">
            <div className="navBottom-inner">
            {categories.map((cat,index)=><CategoryLink category={cat} key={index}/>)}
            </div>
        </nav>
    )
}

interface CatProps{
    category: string
}

const CategoryLink:React.FC<CatProps> = ({category})=>{
    return (
        <NavLink  to={`/products/${category}`}>{category}</NavLink>
    )

}

export default NavbarBottom
