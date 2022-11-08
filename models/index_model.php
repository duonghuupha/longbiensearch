<?php
class Index_Model extends Model{
    function __construct(){
        parent::__construct();
    }

    function check_login($username, $password){
        $query = $this->db->query("SELECT COUNT(*) AS Total FROM tbl_users WHERE username = '$username'
                                    AND password = '$password' AND active = 1");
        $row = $query->fetchAll();
        return $row[0]['Total'];
    }

    function get_data($username, $password){
        $query = $this->db->query("SELECT * FROM tbl_users WHERE username = '$username'
                                    AND password = '$password' AND active = 1");
        return $query->fetchAll();
    }
////////////////////////////////////////////////////////////////////////////////////////////////
    function updateLogin($username, $password, $data){
        $query = $this->update("tbl_users", $data, "username = '$username' AND password = '$password'");
        return $query;
    }

    function check_year_active(){
        $query = $this->db->query("SELECT COUNT(*) AS Total FROM tbldm_years WHERE active = 1");
        $row = $query->fetchAll();
        return $row[0]['Total'];
    }

    function get_year_active(){
        $query = $this->db->query("SELECT * FROM tbldm_years WHERE active = 1");
        return $query->fetchAll();
    }

    function get_year_via_id($id){
        $query = $this->db->query("SELECT * FROM tbldm_years WHERE id = $id");
        return $query->fetchAll();
    }

    function check_exit_year(){
        $query = $this->db->query("SELECT COUNT(*) AS Total FROM tbldm_years");
        $row = $query->fetchAll();
        return $row[0]['Total'];
    }
///////////////////////////////////////////////////////////////////////////////////////////////////////
    function get_total_personel(){
        $query = $this->db->query("SELECT COUNT(*) AS Total FROM tbl_personel WHERE status = 1");
        $row  = $query->fetchAll();
        return $row[0]['Total'];
    }
}
?>