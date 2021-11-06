import axios from 'axios';

export const addSkill = async (parent, values) => {
  const parentModule =
    parent !== 'null' && parent !== null && parent !== 'parent'
      ? parent
      : undefined;
  try {
    const res = await axios({
      method: 'POST',
      url: `http://localhost:8080/skillmodules`,
      data: {
        ...values,
        parentModule
      }
    });
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      errors: [{ msg: 'Something Went Wrong' }]
    };
  }
};

export const getSkills = async (parent) => {
  try {
    const body = JSON.stringify({ parentModule: parent });
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8080/skillmodules?parentModule=${parent}`
    });
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      errors: [{ msg: 'Something Went Wrong' }]
    };
  }
};

export const getSkill = async (id) => {
  try {
    const res = await axios({
      method: 'GET',
      url: `http://localhost:8080/skillmodules/${id}`
    });
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      errors: [{ msg: 'Something Went Wrong' }]
    };
  }
};

export const getSubSkills = async (id) => {
  try {
    const body = JSON.stringify({ parentModule: id });
    const res = await axios.get('submodules', body);
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      errors: [{ msg: 'Something Went Wrong' }]
    };
  }
};

export const deleteSkill = async (id) => {
  try {
    const res = await axios({
      method: 'DELETE',
      url: `http://localhost:8080/skillmodules/${id}`
    });
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      errors: [{ msg: 'Something Went Wrong' }]
    };
  }
};

export const updateSkill = async (id, values) => {
  try {
    const body = JSON.stringify(values);
    const res = await axios.delete(`skillmodules/${id}`, body);
    return res.data;
  } catch (e) {
    console.log(e);
    if (e?.response?.data) {
      return e.response.data;
    }
    return {
      errors: [{ msg: 'Something Went Wrong' }]
    };
  }
};
