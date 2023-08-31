const { Op } = require('sequelize');
const Employee = require('../schema/Employee');
const FileManagement = require('../schema/FileManagement');

const GetEmployees = async (req, res) => {
  try {
    const { offset, limit } = req.query;

    const get = await Employee.findAndCountAll({
      include: [
        {
          model: FileManagement,
          attributes: ['id', 'file_name', 'file_type', 'file'],
        },
      ],
      order: [['created_at', 'DESC']],
      offset: parseInt(offset),
      limit: parseInt(limit),
      raw: true,
    });

    return res.status(200).send({
      msg: 'List of Employees',
      data: get['rows'],
      count: get['count'],
    });
  } catch (err) {
    console.log({ err });
  }
};

const GetEmployeeById = async (req, res) => {
  try {
    const { id } = req.query;

    const get = await Employee.findOne({
      where: { id: id },
      include: [
        {
          model: FileManagement,
          attributes: ['id', 'file_name', 'file_type', 'file'],
        },
      ],
      raw: true,
    });

    return res.status(200).send({
      msg: 'Get Employees',
      data: get,
    });
  } catch (err) {
    console.log({ err });
  }
};

const SearchEmployees = async (req, res) => {
  try {
    const get = await Employee.findAndCountAll({
      where: { email: { [Op.like]: '%' + req.query.search + '%' } },
      raw: true,
    });

    if (get.rows && get.rows.length > 0) {
      return res.status(200).send({
        msg: 'Search Employee',
        data: get['rows'],
        count: get['count'],
      });
    } else {
      return res.status(204).send({
        msg: 'No Data',
      });
    }
  } catch (err) {
    console.log({ err });
  }
};

const DeActiveEmployees = async (req, res) => {
  try {
    const { id, status } = req.body;

    const get = await Employee.update(
      { isActive: status },
      { where: { id: id } }
    );

    return res.status(200).send({ msg: 'Status changed' });
  } catch (err) {
    console.log({ err });
  }
};

const CreateAndUpdateEmployee = async (req, res) => {
  try {
    var extEmp;
    var createEmp;
    var updateEmp;
    var extFile;
    var fileManagement;

    const { id, name, img, email, mobile, designation, gender, course } =
      req.body;

    if (id) {
      extEmp = await Employee.findOne({ where: { id: id } });
    }

    if (img) {
      extFile = await FileManagement.findOne({ where: { file_name: img } });
    }

    if (extFile) {
      fileManagement = { id: extFile.id };
    } else {
      fileManagement = await FileManagement.create({
        file_name: req.file.originalname,
        file_type: req.file.mimetype,
        file: req.file.buffer,
      });
    }

    var body = {
      name: req.body.name,
      img: fileManagement.id,
      email: req.body.email,
      mobile: req.body.mobile,
      designation: req.body.designation,
      gender: req.body.gender,
      course: req.body.course,
      isActive: true,
    };

    if (extEmp) {
      updateEmp = await Employee.update(body, { where: { id } });

      return res.status(200).send({ msg: 'Employee Updated', data: updateEmp });
    } else {
      createEmp = await Employee.create(body);

      return res.status(200).send({ msg: 'Employee Created', data: createEmp });
    }
  } catch (err) {
    console.log({ err });
  }
};

const DeleteEmployees = async (req, res) => {
  try {
    const { id } = req.body;

    const del = await Employee.destroy({ where: { id: id } });

    return res.status(200).send({ msg: 'Employee Deleted' });
  } catch (err) {
    console.log({ err });
  }
};

module.exports = {
  GetEmployees,
  GetEmployeeById,
  CreateAndUpdateEmployee,
  SearchEmployees,
  DeActiveEmployees,
  DeleteEmployees,
};
