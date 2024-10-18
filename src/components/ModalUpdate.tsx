import { Button, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { PencilSquareIcon } from '@heroicons/react/20/solid';
import axios from "axios";
import { ProjectInt } from "../pages/Projects";
import { useState } from "react";
import { FaFileUpload } from "react-icons/fa";


export default function ModalUpdate({ project, handleUpdate }: { project: ProjectInt, handleUpdate: () => void }){

    const [open, setOpen] = useState(false)
    const handleShow = () => setOpen(true);

    const [UpdatedProject, setUpdatedProject] = useState({
      ...project
    });

    const handleUpdateProject = () => {
      axios.put(`https://ecomp-egs.onrender.com/projeto_update/`, UpdatedProject)
        .then(() => {
          handleSubmitFile(UpdatedProject.id)
          handleUpdate();
          setOpen(false);
        })
        .catch(error => {
          console.error('Erro ao atualizar projeto:', error);
        });
    };

    const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmitFile = async (id: string) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post(`https://ecomp-egs.onrender.com/upload_logo_projeto/?id_projeto=${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log(response);
      } catch (error) {
        console.log('Error:', error);
      }
    } else {
      console.log('Nenhum arquivo selecionado');
    }
  };

    return(
        <>
        <Button onClick={handleShow} className="text-dark-color h-full w-5">
            <PencilSquareIcon className="h-5 w-5"/>
        </Button>

        <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop transition className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"/>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[40vw] data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-[#D8DBE2] pt-5 sm:p-4 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h2" className="text-lg font-semibold leading-6 text-dark-color">
                    Atualizar: {project.titulo}
                  </DialogTitle>
                </div>
              </div>
            </div>
            <form action="POST">
              <div className="grid grid-cols-2 justify-start pt-4 px-6 gap-y-[2vh]">
                <div>
                  <h3 className="text-lg font-semibold">Titulo</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Titulo" value={UpdatedProject.titulo} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, titulo:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Equipe</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Pessoa1;Pessoa2;Pessoa3" value={UpdatedProject.equipe} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, equipe:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Organização Parceira</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Ex: POLI/UPE" value={UpdatedProject.cliente} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, cliente:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tema</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Ex: Engenharia de Software" value={UpdatedProject.tema} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, tema:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Semestre</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Ex: 2024.1" value={UpdatedProject.semestre} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, semestre:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Tecnologias Utilizadas</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Tecnologia1;Tecnologia2;Tecnologia3" value={UpdatedProject.tecnologias_utilizadas} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, tecnologias_utilizadas:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Link do Pitch</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Pitch" value={UpdatedProject.pitch} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, pitch:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Link do Vídeo Técnico</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Vídeo Técnico" value={UpdatedProject.video_tecnico} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, video_tecnico:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Repositório</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Repositório" value={UpdatedProject.link_repositorio} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, link_repositorio:e.target.value}))}/>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Palavras Chave</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Palavra1;Palavra2;Palavra3" value={UpdatedProject.palavras_chave} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, palavras_chave:e.target.value}))}/>
                </div>
                <div className="mb-10">
                  <h3 className="text-lg font-semibold">Descrição</h3>
                  <input type="text" name="titulo" id="titulo" placeholder="Descrição" value={UpdatedProject.descricao} className="focus:outline-none border-b-2 w-[15vw]" onChange={(e) => (setUpdatedProject({...UpdatedProject, descricao:e.target.value}))}/>
                </div>
                <div className="w-[15vw] relative">
                  <input type="file" className="hidden" name="logo" id="logo" onChange={(e: any) => setSelectedFile(e.target.files[0])}/>
                  <label
                    htmlFor="logo"
                    className={`absolute flex items-center px-3 py-2 rounded-md w-full text-dark-color text-xs font-semibold cursor-pointer ${
                      !selectedFile ? "bg-green-500" : "bg-[#D8DBE2]"
                    } hover:opacity-60 select-none whitespace-nowrap`}
                    style={{ 
                      textOverflow: 'ellipsis', 
                      overflow: 'hidden', 
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {selectedFile ? (
                      <span>Modificar Logo</span>
                    ) : (
                      <span>Atualizar Logo</span>
                    )}
                    <FaFileUpload className="ml-2" />
                  </label>
                </div>
              </div>
            </form>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-400 sm:ml-3 sm:w-auto"
                onClick={handleUpdateProject}
              >
                Enviar
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancelar
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
      </Dialog>
    </>
    )
}