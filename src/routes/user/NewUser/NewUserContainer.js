import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';
import axios from 'axios';
import { toast } from 'react-toastify';

import NewUserPresenter from './NewUserPresenter';
import useInput from 'hooks/useInput';

const GET_MAJOR_AND_GEN = gql`
  {
    seeAllMajor {
      name
    }
    seeAllGradYear {
      generation
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $birthday: String!
    $email: String!
    $cellPhone: String!
    $company: String
    $companyDesc: String
    $team: String
    $position: String
    $workPhone: String
    $workAddress: String
    $photo: String
    $majorName: String!
    $generation: Int!
  ) {
    createUser(
      name: $name
      birthday: $birthday
      email: $email
      cellPhone: $cellPhone
      company: $company
      companyDesc: $companyDesc
      team: $team
      position: $position
      workPhone: $workPhone
      workAddress: $workAddress
      photo: $photo
      majorName: $majorName
      generation: $generation
    ) {
      name
    }
  }
`;

export default () => {
  const { data: queryData, loading: queryLoading } = useQuery(
    GET_MAJOR_AND_GEN
  );
  const [addUser, { data, loading }] = useMutation(CREATE_USER);

  const name = useInput('');
  const [birthday, setBirthday] = useState(new Date('1990-01-01'));
  const email = useInput('');
  const cellPhone = useInput('');
  const company = useInput('');
  const companyDesc = useInput('');
  const team = useInput('');
  const position = useInput('');
  const workPhone = useInput('');
  const workAddress = useInput('');
  const majorName = useInput('');
  const generation = useInput('');
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);
  const [file, setFile] = useState();
  const [axiosLoading, setAxiosLoading] = useState(false);

  if (data && data.createUser && data.createUser.name) {
    toast.success('등록이 완료되었습니다.');
  }

  const handleDateChange = date => {
    setBirthday(date);
  };

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
        await addUser({
          variables: {
            name: name.value !== '' ? name.value : null,
            birthday,
            email: email.value !== '' ? email.value : null,
            cellPhone: cellPhone.value !== '' ? cellPhone.value : null,
            company: company.value !== '' ? company.value : null,
            companyDesc: companyDesc.value !== '' ? companyDesc.value : null,
            team: team.value !== '' ? team.value : null,
            position: position.value !== '' ? position.value : null,
            workPhone: workPhone.value !== '' ? workPhone.value : null,
            workAddress: workAddress.value !== '' ? workAddress.value : null,
            majorName: majorName.value,
            generation: generation.value,
            photo: location
          }
        });
      } catch {
        toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      }
    } else {
      try {
        await addUser({
          variables: {
            name: name.value !== '' ? name.value : null,
            birthday,
            email: email.value !== '' ? email.value : null,
            cellPhone: cellPhone.value !== '' ? cellPhone.value : null,
            company: company.value !== '' ? company.value : null,
            companyDesc: companyDesc.value !== '' ? companyDesc.value : null,
            team: team.value !== '' ? team.value : null,
            position: position.value !== '' ? position.value : null,
            workPhone: workPhone.value !== '' ? workPhone.value : null,
            workAddress: workAddress.value !== '' ? workAddress.value : null,
            majorName: majorName.value,
            generation: generation.value
          }
        });
      } catch {
        toast.error('Upload 실패. 나중에 다시 시도해주십시오.');
      }
    }
  };

  return (
    <>
      {!loading && data && data.createUser && data.createUser.name && (
        <Redirect to='/users' />
      )}
      <NewUserPresenter
        name={name}
        birthday={birthday}
        handleDateChange={handleDateChange}
        email={email}
        cellPhone={cellPhone}
        company={company}
        companyDesc={companyDesc}
        team={team}
        position={position}
        workPhone={workPhone}
        workAddress={workAddress}
        majorName={majorName}
        generation={generation}
        inputLabel={inputLabel}
        labelWidth={labelWidth}
        queryData={queryData}
        queryLoading={queryLoading}
        setFile={setFile}
        onSubmit={onSubmit}
        loading={loading}
        axiosLoading={axiosLoading}
      />
    </>
  );
};
