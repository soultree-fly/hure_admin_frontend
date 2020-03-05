import React, { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';

import RequestsPresenter from './RequestsPresenter';

const SEE_ALL_REQUEST = gql`
  query seeAllRequest($limit: Int!, $page: Int!) {
    seeAllRequest(limit: $limit, page: $page) {
      id
      name
      email
      cellPhone
      major {
        name
      }
      graduatedYear {
        generation
      }
    }
    howManyRequest
  }
`;

const CONFIRM_REQUESTS = gql`
  mutation confirmRequests($id: [ID!]!) {
    confirmRequests(id: $id)
  }
`;

const REJECT_REQUESTS = gql`
  mutation rejectRequests($id: [ID!]!) {
    rejectRequests(id: $id)
  }
`;

export default () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const limit = 10;
  const [selected, setSelected] = useState([]);
  const [type, setType] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);

  const [getRequests, { data, loading, refetch }] = useLazyQuery(
    SEE_ALL_REQUEST,
    {
      variables: { limit, page }
    }
  );
  useEffect(() => {
    getRequests();
    if (data && data.howManyRequest) {
      setLastPage(Math.ceil(data.howManyRequest / limit));
    }
  }, [getRequests, data]);

  const [
    confirmRequests,
    { loading: confirmLoading, error: confirmError }
  ] = useMutation(CONFIRM_REQUESTS);
  const [
    rejectRequests,
    { loading: rejectLoading, error: rejectError }
  ] = useMutation(REJECT_REQUESTS);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = data.seeAllRequest.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleConfirmButtonClick = async event => {
    setType('confirm');
    setAlertOpen(true);
  };

  const handleRejectButtonClick = async event => {
    setType('reject');
    setAlertOpen(true);
  };

  const onConfirm = async () => {
    if (type === 'confirm') {
      await confirmRequests({ variables: { id: selected } });
      if (confirmError) toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      else {
        refetch();
        setSelected([]);
      }
    } else if (type === 'reject') {
      await rejectRequests({ variables: { id: selected } });
      if (rejectError) toast.error('Delete 실패. 나중에 다시 시도해주십시오.');
      else {
        refetch();
        setSelected([]);
      }
    }
  };

  return (
    <RequestsPresenter
      data={data}
      loading={loading}
      page={page}
      lastPage={lastPage}
      selected={selected}
      confirmLoading={confirmLoading}
      rejectLoading={rejectLoading}
      alertOpen={alertOpen}
      setAlertOpen={setAlertOpen}
      type={type}
      handleSelectAllClick={handleSelectAllClick}
      handleClick={handleClick}
      handlePageChange={handlePageChange}
      handleConfirmButtonClick={handleConfirmButtonClick}
      handleRejectButtonClick={handleRejectButtonClick}
      onConfirm={onConfirm}
    />
  );
};
