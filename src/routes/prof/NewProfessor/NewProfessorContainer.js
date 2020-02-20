import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

import NewProfessorPresenter from './NewProfessorPresenter';
import useInput from 'hooks/useInput';

const CREATE_PROF = gql`
  mutation createProf(
    $name: String!
    $email: String
    $workPhone: String
    $position: String!
    $title: String!
    $company: String
    $order: Int!
    $photo: String
  ) {
    createProf(
      name: $name
      email: $email
      workPhone: $workPhone
      position: $position
      title: $title
      company: $company
      order: $order
      photo: $photo
    ) {
      name
    }
  }
`;

export default () => {
  const [addProf, { data, loading }] = useMutation(CREATE_PROF);

  const name = useInput('');
  const email = useInput('');
  const workPhone = useInput('');
  const position = useInput('');
  const title = useInput('');
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
            name: name.value,
            email: email.value,
            workPhone: workPhone.value,
            position: position.value,
            title: title.value,
            company: company.value,
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
            name: name.value,
            email: email.value,
            workPhone: workPhone.value,
            position: position.value,
            title: title.value,
            company: company.value,
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
      {!loading && data && data.createProf && data.createProf.name && (
        <Redirect to='/profs' />
      )}
      <NewProfessorPresenter
        name={name}
        email={email}
        workPhone={workPhone}
        position={position}
        title={title}
        company={company}
        order={order}
        setFile={setFile}
        onSubmit={onSubmit}
        loading={loading}
        axiosLoading={axiosLoading}
      />
    </>
  );
};
