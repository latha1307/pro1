/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Box,
  TableHead,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { createClient } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tableHeaders = [
  "MEMBER ID",
  "MEMBER NAME",
  "MEMBER PHONE NUMBER",
  "MEMBER TYPE",
  "REFERRED BY",
  "END ON",
  "ACTIONS",
];

interface Member {
  member_id: string;
  member_name: string;
  member_phone_number: string;
  member_type: string;
  referred_by: string;
  bill_date: string;
}

const Members = () => {
  const [memberData, setMemberData] = useState<Member[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const { data, error } = await supabase
      .from("members")
      .select("member_id, member_name, member_phone_number, member_type, referred_by, bill_date");
    if (error) {
      console.error("Error fetching members:", error);
    } else {
      setMemberData(data);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, member: Member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
    handleClose();
  };

  const handleDelete = async () => {
    if (selectedMember) {
      const { error } = await supabase.from("members").delete().eq("member_id", selectedMember.member_id);
      if (error) {
        toast.error("Failed to delete member: " + error.message);
      } else {
        toast.success("Member deleted successfully!");
        fetchMembers();
      }
    }
    handleClose();
  };

  const handleEditSubmit = async () => {
    if (selectedMember) {
      const updatedMember = {
        member_id: selectedMember.member_id,
        member_name: selectedMember.member_name,
        member_phone_number: selectedMember.member_phone_number,
        member_type: selectedMember.member_type,
        referred_by: selectedMember.referred_by,
        bill_date: selectedMember.bill_date,
      };

      const { error } = await supabase
        .from("members")
        .update(updatedMember)
        .eq("member_id", selectedMember.member_id);
      if (error) {
        toast.error("Failed to update member: " + error.message);
      } else {
        toast.success("Member updated successfully!");
        fetchMembers();
      }
    }
    setOpenEditDialog(false);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSelectedMember((prevData) =>
      prevData
        ? {
            ...prevData,
            [name]: value,
          }
        : null
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography
        variant="h5"
        sx={{ marginBottom: 2, textAlign: "center", color: "#71045F", fontWeight: "bold" }}
      >
        Member Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index} align="center" sx={{ backgroundColor: "#F7EEF9", fontWeight: "700" }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {memberData.map((member, index) => (
              <TableRow key={index}>
                <TableCell align="center">{member.member_id}</TableCell>
                <TableCell align="center">{member.member_name}</TableCell>
                <TableCell align="center">{member.member_phone_number}</TableCell>
                <TableCell align="center">{member.member_type}</TableCell>
                <TableCell align="center">{member.referred_by}</TableCell>
                <TableCell align="center">{member.bill_date}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    onClick={(event) => handleClick(event, member)}
                    endIcon={<ArrowDropDownIcon />}
                  >
                    Actions
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit Member</DialogTitle>
        <DialogContent>
        <TextField
            name="member_id"
            label="Member ID"
            fullWidth
            value={selectedMember?.member_id || ""}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="member_name"
            label="Member Name"
            fullWidth
            value={selectedMember?.member_name || ""}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="member_phone_number"
            label="Phone Number"
            fullWidth
            value={selectedMember?.member_phone_number || ""}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="member_type"
            label="Member Type"
            fullWidth
            value={selectedMember?.member_type || ""}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="referred_by"
            label="Referred By"
            fullWidth
            value={selectedMember?.referred_by || ""}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
          <TextField
            name="bill_date"
            label="End On"
            fullWidth
            value={selectedMember?.bill_date || ""}
            onChange={handleEditChange}
            sx={{ marginBottom: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Members;