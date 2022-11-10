<?php
class Model {
    function __construct() {
		$this->db = new Database();
	}
	 // them moi du lieu
	 function insert($table, $array){
        $cols = array();
        $bind = array();
        foreach($array as $key => $value){
            $cols[] = $key;
            $bind[] = "'".$value."'";
        }
        $query = $this->db->query("INSERT INTO ".$table." (".implode(",", $cols).") VALUES (".implode(",", $bind).")");
        return $query;
    }
//////////////////////////////////////////////////////////////////////////////////////////////////
	function get_info_document_in($id){
		$query = $this->db->query("SELECT id, cate_id, file FROM tbl_document_in WHERE id = $id");
		return $query->fetchAll();
	}
	function get_info_document_out($id){
		$query = $this->db->query("SELECT id, cate_id, file FROM tbl_document_out WHERE id = $id");
		return $query->fetchAll();
	}
/////////////////////////////////////end cac ham khac ///////////////////////////////////////////////////////////////////////
}

?>
