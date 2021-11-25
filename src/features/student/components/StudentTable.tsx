import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { City, Student } from 'models';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { capitalizeString, getMarkColor } from 'utils/comon';

const useStyles = makeStyles({
  table: {},
});

export interface StudentTableProps {
  studentList: Student[];
  cityMap: {
    [key: string]: City;
  };
  onEdit?: (student: Student) => void;
  onRemove?: (student: Student) => void;
}

export default function StudentTable({
  studentList,
  cityMap,
  onEdit,
  onRemove,
}: StudentTableProps) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState<Student>();

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveClick = (student: Student) => {
    // Set selected student
    setSelectedStudent(student);
    setOpen(true);

    // Show confirm dialog
  };
  const handleRemoveConfirm = (student: Student) => {
    // call onRemove
    onRemove?.(student);

    // hide dialog
    setOpen(false);
  };
  return (
    <>
      <TableContainer>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Mark</TableCell>
              <TableCell>City</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentList.map((student, idx) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{capitalizeString(student.gender)}</TableCell>
                <TableCell>
                  <Box color={getMarkColor(student.mark)}>{student.mark}</Box>
                </TableCell>
                <TableCell>{cityMap[student.city]?.name}</TableCell>
                <TableCell align="right">
                  <Button
                    style={{ marginRight: 5 }}
                    variant="contained"
                    color="primary"
                    onClick={() => onEdit?.(student)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemoveClick(student)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Remove dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Remove a student</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure to remove student named {selectedStudent?.name} .<br /> This action cant be
            undo
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={() => handleRemoveConfirm(selectedStudent as Student)}
            color="secondary"
            autoFocus
            variant="contained"
          >
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
