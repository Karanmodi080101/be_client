import axios from 'axios';
import React, { useState, useEffect, Fragment } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { City, Country } from 'country-state-city';
import Creatable from 'react-select/creatable';
import profileData from '../../../assets/json/profiledata.json';

const ProfileComponent = (props) => {
  const [formData, setFormData] = useState({
    ...props?.formData
  });
  const [dropdownData, setdropdownData] = useState([]);

  useEffect(() => {
    fetchdata();
    console.log('component', props);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fetchdata = async () => {
    const response = await axios.get('static');
    console.log('response', response.data);
    setdropdownData(response.data[0]);
  };

  return (
    <div className='container'>
      <form className='form py-5' onSubmit={(e) => props.onSubmit(e, formData)}>
        {profileData?.map((row) => {
          return (
            <div className='row'>
              {row?.map((item, index) => {
                return (
                  <div className='col-md-4'>
                    <div className='form-group' key={item?.id}>
                      <label>{item?.label}</label>
                      {(() => {
                        switch (item.inputType) {
                          case 'input':
                            return (
                              <input
                                type={item?.type}
                                placeholder={item?.label}
                                name={item?.name}
                                value={
                                  item?.name === 'dob' ||
                                  item?.name === 'dateOfEmployment'
                                    ? formData[item?.name]
                                        ?.toString()
                                        .split('T')[0]
                                    : formData[item?.name]
                                }
                                onChange={(e) => handleChange(e)}
                                required={item?.required}
                                readOnly={item?.readOnly}
                              />
                            );
                            break;

                          case 'Dropdown':
                            return (
                              <>
                                <br />
                                <Dropdown
                                  value={formData[item?.name]}
                                  options={
                                    item?.name === 'birthCountry' ||
                                    item?.name === 'nationality'
                                      ? Country.getAllCountries()
                                      : item?.name === 'gender'
                                      ? dropdownData?.gendervalue
                                      : City.getCitiesOfCountry(
                                          formData?.birthCountry?.isoCode
                                        )
                                  }
                                  onChange={(e) => handleChange(e)}
                                  optionLabel={
                                    item?.name === 'gender' ? 'label' : 'name'
                                  } //'name
                                  name={item?.name}
                                  filter
                                  showClear
                                  filterBy={
                                    item?.name === 'gender' ? 'label' : 'name'
                                  } //'name'
                                  placeholder={item?.placeholder}
                                  //valueTemplate={selectedCountryTemplate}
                                  //itemTemplate={countryOptionTemplate}
                                />
                              </>
                            );
                            break;

                          case 'textarea':
                            return (
                              <textarea
                                type={item?.type}
                                placeholder={item?.label}
                                name={item?.name}
                                value={formData[item?.name]}
                                onChange={(e) => handleChange(e)}
                                required={item?.required}
                              />
                            );
                            break;

                          case 'Creatable':
                            return (
                              <>
                                <br />
                                <Creatable
                                  isMulti
                                  onChange={(value) =>
                                    setFormData({
                                      ...formData,
                                      [item?.name]: value
                                    })
                                  }
                                  options={dropdownData[item?.name]}
                                  value={formData[item?.name]}
                                />
                              </>
                            );
                            break;

                          default:
                            break;
                        }
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <input
          type='submit'
          className='btn btn-primary'
          value={props?.buttonName}
        />
      </form>
    </div>
  );
};

export default ProfileComponent;
