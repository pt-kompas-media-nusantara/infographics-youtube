# Pemakaian #
Repositori ini digunakan untuk menampilkan pemutar video dari YouTube beserta navigasi linimasa berdasarkan waktu. Navigasi linimasa berfungsi untuk "melompat" ke waktu tertentu dari video.

# Prosedur #
1. Buatlah kontainer berupa elemen <div> dalam dokumen HTML (biasanya di CMS atau di tab WebInfographics) dan berikan ID yang unik sehingga kemungkinan adanya duplikasi ID dalam dokumen HTML kecil sekali. Apabila Anda menambahkannya di CMS, letakkan elemen tersebut di posisi Anda ingin menampilkan pemutar video ini.

        <div id="yt-timeline"></div>

2. Di baris selanjutnya buatlah elemen <script>:

        <script src="http://id.infografik.print.kompas.com/libs/js/kompas-infographics-video.min.js" type="text/javascript"></script>

    (sekali lagi) Semoga segera pindah ke server kompas.id.

3. Di baris selanjutnya buatlah elemen <script> lagi, kali ini berisi pilihan dan data yang akan ditampilkan:

        <script>
            var options = {
                    container : 'yt-timeline', // nama ID kontainer yang dibuat di poin 1
                    youTubeVideoID : '7V-fIGMDsmE', // ID video di YouTube, biasanya di parameter v di url: https://www.youtube.com/watch?v=tntOCGkgt98
                    data : [
                        {
                            title: 'Ikhtisar', // judul navigasi linimasa
                            speaker: 'Sundar Pichai', // nama pembicara
                            start: '00:03:32', // waktu mulai pembicara bersangkutan muncul di video, format hh:mm:ss
                            secondStart: null // jangan diubah-ubah
                        },
                        {
                            title: 'Android M',
                            speaker: 'Dave Burke',
                            start: '00:11:53',
                            secondStart: null
                        },
                        {
                            title: 'Android Wear',
                            speaker: 'David Singleton',
                            start: '00:28:33',
                            secondStart: null
                        },
                        {
                            title: 'Internet of Things',
                            speaker: 'Sundar Pichai',
                            start: '00:37:22',
                            secondStart: null
                        },
                        {
                            title: 'Google Now',
                            speaker: 'Aparna Chennapragada',
                            start: '00:48:27',
                            secondStart: null
                        },
                        {
                            title: 'Google Photos',
                            speaker: 'Anil Sabharwal',
                            start: '01:00:07',
                            secondStart: null
                        },
                        {
                            title: 'Android One & Products',
                            speaker: 'Jen Fitzpatrick',
                            start: '01:14:23',
                            secondStart: null
                        },
                        {
                            title: 'Developer Products',
                            speaker: 'Jason Titus',
                            start: '01:29:19',
                            secondStart: null
                        },
                        {
                            title: 'Google Play',
                            speaker: 'Ellie Powers',
                            start: '01:41:30',
                            secondStart: null
                        },
                        {
                            title: 'Android Nanodegree',
                            speaker: 'Sundar Pichai',
                            start: '01:47:05',
                            secondStart: null
                        },
                        {
                            title: 'Google Cardboard',
                            speaker: 'Clay Bavor',
                            start: '01:49:38',
                            secondStart: null
                        }
                    ]
                },
                ytPlayer = new KompasInfographicsVideos('youtube-timeline', options); // buat obyek baru yang menyimpan opsi pemutar video
            ytPlayer.initiateVideo(); // tampilkan pemutar video beserta navigasi linimasanya
        </script>

# Coba-coba #
Unduh berkas-berkas yang terkompresi dalam berkas .zip, kemudian ekstrak ke komputer Anda. Jalankan berkas index.html di dalam folder hasil ekstrak tersebut.

# Kontribusi #
Anda diundang untuk berkontribusi terhadap repositori ini untuk menambahkan fitur baru ataupun memperbaiki masalah dan galat yang timbul akibat adanya kutu dalam aplikasi ini. Untuk itu, Anda memerlukan pengetahuan akan HTML, CSS, Javascript, dan, tentu saja, Git. Git dipergunakan untuk manajemen versi repositori ini.