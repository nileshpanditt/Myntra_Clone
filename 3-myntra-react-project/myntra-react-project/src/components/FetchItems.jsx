import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemsActions } from "../store/itemsSlice";
import { fetchStatusActions } from "../store/fetchStatusSlice";

const FetchItems = () => {
  const fetchStatus = useSelector((store) => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if fetching is already done.  false: fetching not done, true:done
    if (fetchStatus.fetchDone) return; //false
    const controller = new AbortController();
    const signal = controller.signal;
    // const {signal} = new AbortController();

    dispatch(fetchStatusActions.markFetchingStarted()); //true
    fetch("http://localhost:8080/items", { signal })
      .then((res) => res.json())
      .then(({ items }) => {
        dispatch(fetchStatusActions.markFetchDone()); // true
        dispatch(fetchStatusActions.markFetchingFinished()); //false
        dispatch(itemsActions.addInitialItems(items[0]));
      });

    return () => {
      controller.abort;
    };
  }, [fetchStatus]);

  return <></>;
};

export default FetchItems;
