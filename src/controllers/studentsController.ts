import { RequestHandler } from 'express'

import { createRandomId } from '../utils/utils'
import Students from '../models/studentModel'
import { addLog } from './logController'

export const addStudent: RequestHandler = async (req, res) => {
  if (req.method !== 'POST') return res.status(401).json({ error: 'Invalid HTTP method' })
  if (req.body) {
    try {
      // const duplicateStudent = req.body.uid ? await Students.findOne({ uid: req.body.uid }) : null
      // if (duplicateStudent) {
      //   return res.status(401).json({ error: 'Student already in system' })
      // }
      const newStudent = { ...req.body, uid: createRandomId(), created_by: req.body.user_id }
      const studentCreated = await Students.create(newStudent)
      if (studentCreated) {
        const log = {
          user_id: req.body.user_id,
          model: 'students',
          event_type: 'new',
          reference_id: newStudent.uid,
        }
        addLog(log)
        res.status(200).send('Student created')
      } else {
        res.status(401).json({ error: 'Student was not created' })
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Invalid data' })
    }
  }
}

export const updateStudent: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).json({ error: 'Unable to update student' })
  if (req.body) {
    try {
      const studentUpdated = await Students.findOneAndUpdate(
        { uid: req.params.id },
        { $set: req.body, modified_by: req.body.user_id }
      )
      if (studentUpdated) {
        const log = {
          user_id: req.body.user_id,
          model: 'students',
          event_type: 'updated',
          reference_id: studentUpdated.uid,
        }
        addLog(log)
        res.status(200).send(studentUpdated)
      }
    } catch (err) {
      res.status(500).send({ error: err })
    }
  } else if (Error) {
    console.log(Error)
    res.status(401).send({ error: 'Update not completed or Access Denied' })
  }
}

export const getStudents: RequestHandler = async (req, res) => {
  try {
    const students = await Students.find({ enabled: true })
    res.send(students)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all students' })
  }
}

export const getStudentsAdminView: RequestHandler = async (req, res) => {
  try {
    const students = await Students.find()
    res.send(students)
  } catch (error) {
    res.status(500).send({ message: 'Unable to get all students' })
  }
}

export const getStudent: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'ID missing or Access Denied' })

  const { id } = req.params

  try {
    const userFound = await Students.findById(id)
    res.status(200).send(userFound)
  } catch (err) {
    res.status(500).send({ error: err })
  }
}

export const disableStudent: RequestHandler = async (req, res) => {
  if (!req.params) return res.status(401).send({ error: 'Update not completed or Access Denied' })

  try {
    const studentUpdated = await Students.findOneAndUpdate(
      { uid: req.params.id },
      { $set: { enabled: false, modified_by: req.body.user_id } }
    )
    if (studentUpdated) {
      const log = {
        user_id: req.body.user_id,
        model: 'students',
        event_type: 'disabled',
        reference_id: studentUpdated.uid,
      }
      addLog(log)
      res.status(200).send({ success: `Student id ${req.params.id} has been disabled ` })
    }
  } catch (err) {
    res.status(500).send({ error: err })
  }
}
