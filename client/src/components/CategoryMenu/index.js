import React, { useEffect } from "react";
// import { useStoreContext } from "../../utils/GlobalState";
import { idbPromise } from "../../utils/helpers";

import { useQuery } from '@apollo/react-hooks';
import { QUERY_CATEGORIES } from "../../utils/queries";
// import {
//   UPDATE_CATEGORIES,
//   UPDATE_CURRENT_CATEGORY,
// } from "../../utils/actions";

//REDUX IMPORTS 
import {
  updateCategories, updateCurrentCategory
} from '../../actions';

import { useSelector, useDispatch } from 'react-redux'


function CategoryMenu() {
  // const [state, dispatch] = useStoreContext();

  // const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  //REDUX

  const commerceState = useSelector((state) => state.commerce);
 
  const dispatchREDUX = useDispatch();

   const {
     //GET REDUX CATEGORIES
     categories,
   } = commerceState;
   const categoriesREDUX = categories;


  useEffect(() => {
    // if categoryData exists or has changed from the response of useQuery, then run dispatch()
    if (categoryData) {
      // dispatch({
      //   type: UPDATE_CATEGORIES,
      //   categories: categoryData.categories,
      // });
      //REDUX DISPATCHER
      dispatchREDUX(updateCategories(categoryData.categories));

      categoryData.categories.forEach((category) => {
        idbPromise("categories", "put", category);
      });
    } else if (!loading) {
      idbPromise("categories", "get").then((categories) => {
        // dispatch({
        //   type: UPDATE_CATEGORIES,
        //   categories: categories,
        // });
         dispatchREDUX(updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatchREDUX]);

  const handleClick = (_id) => {
    // dispatch({
    //   type: UPDATE_CURRENT_CATEGORY,
    //   currentCategory: id,
    // });
     dispatchREDUX(updateCurrentCategory(_id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categoriesREDUX.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};


export default CategoryMenu;
