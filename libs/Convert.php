<?php
class Convert{
	//pagination
    function pagination($total, $get_pages, $per_page = 20){
        $perpage = $per_page;
        $posts  = $total;
        $pages  = ceil($posts / $perpage);
        //$get_pages = isset($_REQUEST['page']) ? $_REQUEST['page'] : 1;
        $data = array(
            'options' => array(
                'default'   => 1,
                'min_range' => 1,
                'max_range' => $pages
            )
        );

        $number = trim($get_pages);
        $number = filter_var($number, FILTER_VALIDATE_INT, $data);
        $range  = $perpage * ($number - 1);
        $prev = $number - 1;
        $next = $number + 1;
        $pagination = array('range' => $range, 'perpage' => $perpage, 'prev' => $prev, 'next' => $next, 'number' => $number, 'pages' => $pages);
        return $pagination;
    }

	function vn2latin($cs, $tolower = false){
        /*Mảng chứa tất cả ký tự có dấu trong Tiếng Việt*/
        $marTViet=array("à","á","ạ","ả","ã","â","ầ","ấ","ậ","ẩ","ẫ","ă",
            "ằ","ắ","ặ","ẳ","ẵ","è","é","ẹ","ẻ","ẽ","ê","ề",
            "ế","ệ","ể","ễ",
            "ì","í","ị","ỉ","ĩ",
            "ò","ó","ọ","ỏ","õ","ô","ồ","ố","ộ","ổ","ỗ","ơ",
            "ờ","ớ","ợ","ở","ỡ",
            "ù","ú","ụ","ủ","ũ","ư","ừ","ứ","ự","ử","ữ",
            "ỳ","ý","ỵ","ỷ","ỹ",
            "đ",
            "À","Á","Ạ","Ả","Ã","Â","Ầ","Ấ","Ậ","Ẩ","Ẫ","Ă",
            "Ằ","Ắ","Ặ","Ẳ","Ẵ",
            "È","É","Ẹ","Ẻ","Ẽ","Ê","Ề","Ế","Ệ","Ể","Ễ",
            "Ì","Í","Ị","Ỉ","Ĩ",
            "Ò","Ó","Ọ","Ỏ","Õ","Ô","Ồ","Ố","Ộ","Ổ","Ỗ","Ơ","Ờ","Ớ","Ợ","Ở","Ỡ",
            "Ù","Ú","Ụ","Ủ","Ũ","Ư","Ừ","Ứ","Ự","Ử","Ữ",
            "Ỳ","Ý","Ỵ","Ỷ","Ỹ",
            "Đ"," ","$","%","?","&",'"',',',':',"/");

        /*Mảng chứa tất cả ký tự không dấu tương ứng với mảng $marTViet bên trên*/
        $marKoDau=array("a","a","a","a","a","a","a","a","a","a","a",
            "a","a","a","a","a","a",
            "e","e","e","e","e","e","e","e","e","e","e",
            "i","i","i","i","i",
            "o","o","o","o","o","o","o","o","o","o","o","o",
            "o","o","o","o","o",
            "u","u","u","u","u","u","u","u","u","u","u",
            "y","y","y","y","y",
            "d",
            "A","A","A","A","A","A","A","A","A","A","A","A",
            "A","A","A","A","A",
            "E","E","E","E","E","E","E","E","E","E","E",
            "I","I","I","I","I",
            "O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O","O",
            "U","U","U","U","U","U","U","U","U","U","U",
            "Y","Y","Y","Y","Y",
            "D","-","-","-","-","-","-","-",'',"");

        if ($tolower) {
            return strtolower(str_replace($marTViet,$marKoDau,$cs));
        }
        return str_replace($marTViet,$marKoDau,$cs);
    }

	function createLinks($total, $rows, $currentpage, $url_current, $keyword, $links = 7) {
        $last = ceil( $total / $rows );
        $start = ( ( $currentpage - $links ) > 0 ) ? $currentpage - $links : 1;
        $end = ( ( $currentpage + $links ) < $last ) ? $currentpage + $links : $last;

        $html = '';
        $class = ( $currentpage == 1 ) ? "active" : "";

        if ( $start > 1 ) {
            $html .= '<li class="page-item"><a class="page-link no-border" href="'.$url_current.'?page=1&q='.$keyword.'">1</a></li>';
            $html .= '<li class="page-item">';
            $html .= '<a class="page-link no-border">...</a></li>';
        }
        for ( $i = $start ; $i <= $end; $i++ ) {
            $class = ( $currentpage == $i ) ? "active" : "";
            $html .= '<li class="page-item ' . $class . '">';
            $html .= '<a class="page-link no-border" href="'.$url_current.'?page='.$i.'&q='.$keyword.'">' . $i . '</a>';
            $html .= '</li>';
        }
        if ( $end < $last ) {
            $html .= '<li class="page-item">';
            $html .= '<a class="page-link no-border">...</a></li>';
            $html .= '<li class="page-item">';
            $html .= '<a class="page-link no-border" href="'.$url_current.'?page='.$last.'&q='.$keyword.'">' . $last . '</a>';
            $html .= '</li>';
        }
        return $html;
    }

    function return_show_entries($total, $perpage, $pages){
        if($total == 0){
            $html = "Hiển thị: <b>0 - 0</b> của <b>0</b> kết quả";
        }else{
            $html ='Hiển thị: <b>'.((($pages-1) * $perpage) + 1).' - '; 
            $pagenumber = ceil($total/$perpage);
            $to_record = $pages*$perpage;
            if($pages == $pagenumber){
                $html .= $total;
            }else{
                $html .= $to_record;
            }
            $html .= '</b> của <b>'.$total.'</b> kết quả';
        }
        return $html;
    }
}
?>
