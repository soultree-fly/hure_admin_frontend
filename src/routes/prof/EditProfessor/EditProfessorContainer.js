import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

import EditProfessorPresenter from './EditProfessorPresenter';
import { useInputWithSet } from 'hooks/useInput';

const SEE_PROF = gql`
  query seeProf($id: ID!) {
    seeProf(id: $id) {
      name
      email
      workPhone
      position
      title
      company
      order
      photo
    }
  }
`;

const EDIT_PROF = gql`
  mutation editProf(
    $id: ID!
    $name: String!
    $email: String
    $workPhone: String
    $position: String!
    $title: String!
    $company: String
    $order: Int!
    $photo: String
  ) {
    editProf(
      id: $id
      name: $name
      email: $email
      workPhone: $workPhone
      position: $position
      title: $title
      company: $company
      order: $order
      photo: $photo
    ) {
      id
    }
  }
`;

export default ({ match }) => {
  const {
    params: { id }
  } = match;
  const { data, loading } = useQuery(SEE_PROF, {
    variables: { id }
  });

  const [
    editProf,
    { data: mutationData, loading: mutationLoading }
  ] = useMutation(EDIT_PROF);

  const { property: name, setValue: setName } = useInputWithSet('');
  const { property: email, setValue: setEmail } = useInputWithSet('');
  const { property: workPhone, setValue: setWorkPhone } = useInputWithSet('');
  const { property: position, setValue: setPosition } = useInputWithSet('');
  const { property: title, setValue: setTitle } = useInputWithSet('');
  const { property: company, setValue: setCompany } = useInputWithSet('');
  const { property: order, setValue: setOrder } = useInputWithSet('');
  const [file, setFile] = useState();
  const [axiosLoading, setAxiosLoading] = useState(false);

  useEffect(() => {
    if (data && data.seeProf && data.seeProf.name) {
      setName(data.seeProf.name || '');
      setEmail(data.seeProf.email || '');
      setWorkPhone(data.seeProf.workPhone || '');
      setPosition(data.seeProf.position || '');
      setTitle(data.seeProf.title || '');
      setCompany(data.seeProf.company || '');
      setOrder(data.seeProf.order || '');
    }
  }, [
    data,
    setName,
    setEmail,
    setWorkPhone,
    setPosition,
    setTitle,
    setCompany,
    setOrder
  ]);

  if (mutationData && mutationData.editProf && mutationData.editProf.id) {
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
        await editProf({
          variables: {
            id,
            name: name.value !== '' ? name.value : null,
            email: email.value !== '' ? email.value : null,
            workPhone: workPhone.value !== '' ? workPhone.value : null,
            position: position.value !== '' ? position.value : null,
            title: title.value !== '' ? title.value : null,
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
        await editProf({
          variables: {
            id,
            name: name.value !== '' ? name.value : null,
            email: email.value !== '' ? email.value : null,
            workPhone: workPhone.value !== '' ? workPhone.value : null,
            position: position.value !== '' ? position.value : null,
            title: title.value !== '' ? title.value : null,
            company: company.value !== '' ? company.value : null,
            order: parseInt(order.value),
            photo: data.seeProf.photo
          }
        });
      } catch {
        toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      }
    }
  };

  return (
    <>
      {!loading &&
        !mutationLoading &&
        mutationData &&
        mutationData.editProf &&
        mutationData.editProf.id && <Redirect to='/profs' />}
      <EditProfessorPresenter
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
        mutationLoading={mutationLoading}
        axiosLoading={axiosLoading}
      />
    </>
  );
};
