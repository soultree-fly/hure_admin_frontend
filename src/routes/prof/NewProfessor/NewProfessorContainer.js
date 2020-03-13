import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

import NewProfessorPresenter from './NewProfessorPresenter';
import useInput from 'hooks/useInput';

const GET_MAJOR = gql`
  {
    seeAllMajor {
      name
    }
  }
`;

const CREATE_PROF = gql`
  mutation createProf(
    $name: String!
    $title: String!
    $position: String!
    $majorName: String!
    $email: String
    $workPhone: String
    $company: String
    $order: Int!
    $photo: String
  ) {
    createProf(
      name: $name
      title: $title
      position: $position
      majorName: $majorName
      email: $email
      workPhone: $workPhone
      company: $company
      order: $order
      photo: $photo
    ) {
      id
    }
  }
`;

export default () => {
  const { data: queryData, loading: queryLoading } = useQuery(GET_MAJOR);
  const [addProf, { data, loading }] = useMutation(CREATE_PROF);

  const name = useInput('');
  const title = useInput('');
  const position = useInput('');
  const majorName = useInput('');
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const email = useInput('');
  const workPhone = useInput('');
  const company = useInput('');
  const order = useInput('');
  const [file, setFile] = useState();
  const [axiosLoading, setAxiosLoading] = useState(false);

  if (data && data.createProf && data.createProf.name) {
    toast.success('등록이 완료되었습니다.');
  }

  const onSubmit = async e => {
    e.preventDefault();
    if (file.length > 1) {
      toast.error('파일은 두 개 이상 첨부할 수 없습니다!');
    } else if (file.length === 1) {
      const data = new FormData();
      data.append('photo', file[0]);
      try {
        setAxiosLoading(true);
        const {
          data: { location }
        } = await axios.post(
          'https://hure-backend.herokuapp.com/api/upload',
          data,
          {
            headers: {
              'content-type': 'multipart/form-data'
            }
          }
        );
        setAxiosLoading(false);
        await addProf({
          variables: {
            name: name.value !== '' ? name.value : null,
            title: title.value !== '' ? title.value : null,
            position: position.value !== '' ? position.value : null,
            majorName: majorName.value !== '' ? majorName.value : null,
            email: email.value !== '' ? email.value : null,
            workPhone: workPhone.value !== '' ? workPhone.value : null,
            company: company.value !== '' ? company.value : null,
            order: parseInt(order.value),
            photo: location
          }
        });
      } catch {
        toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      }
    } else {
      try {
        await addProf({
          variables: {
            name: name.value !== '' ? name.value : null,
            title: title.value !== '' ? title.value : null,
            position: position.value !== '' ? position.value : null,
            majorName: majorName.value !== '' ? majorName.value : null,
            email: email.value !== '' ? email.value : null,
            workPhone: workPhone.value !== '' ? workPhone.value : null,
            company: company.value !== '' ? company.value : null,
            order: parseInt(order.value)
          }
        });
      } catch {
        toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      }
    }
  };

  return (
    <>
      {!loading && data && data.createProf && data.createProf.id && (
        <Redirect to='/profs' />
      )}
      <NewProfessorPresenter
        name={name}
        title={title}
        position={position}
        majorName={majorName}
        inputLabel={inputLabel}
        labelWidth={labelWidth}
        email={email}
        workPhone={workPhone}
        company={company}
        order={order}
        setFile={setFile}
        queryData={queryData}
        queryLoading={queryLoading}
        onSubmit={onSubmit}
        loading={loading}
        axiosLoading={axiosLoading}
      />
    </>
  );
};
